#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
mod session;
use session::Database;
use session::Message;
use session::Session;

// use tauri::Manager;
// tauri::Builder::default()
//   .setup(|app| {
//     #[cfg(debug_assertions)] // only include this code on debug builds
//     {
//       let window = app.get_window("main").unwrap();
//       window.open_devtools();
//       window.close_devtools();
//     }
//     Ok(())
//   });

fn main() {
    let db = Database::new("database.db").expect("Unable to create database connection");
    let app_state = AppState::new(Mutex::new(db));
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            create_session,
            get_all_sessions,
            delete_session,
            update_session,
            add_message,
            delete_message,
            get_all_messages
        ])
        .manage(app_state)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

struct AppState {
    db: Mutex<Database>,
}
impl AppState {
    pub fn new(db: Mutex<Database>) -> Self {
        Self { db }
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn create_session(state: tauri::State<AppState>, name: &str) -> Result<Session, String> {
    state
        .db
        .lock()
        .unwrap()
        .add_session(name)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn delete_session(state: tauri::State<AppState>, id: i32) -> Result<(), String> {
    state
        .db
        .lock()
        .unwrap()
        .delete_session(id)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn update_session(state: tauri::State<AppState>, id: i32, name: &str) -> Result<(), String> {
    state
        .db
        .lock()
        .unwrap()
        .update_session(id, name)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn get_all_sessions(state: tauri::State<AppState>) -> Result<Vec<Session>, String> {
    state
        .db
        .lock()
        .unwrap()
        .get_all_sessions()
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn get_all_messages(
    state: tauri::State<AppState>,
    session_id: i32,
) -> Result<Vec<Message>, String> {
    state
        .db
        .lock()
        .unwrap()
        .get_all_messages(session_id)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn delete_message(state: tauri::State<AppState>, message_id: i32) -> Result<(), String> {
    state
        .db
        .lock()
        .unwrap()
        .delete_message(message_id)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn add_message(
    state: tauri::State<AppState>,
    session_id: i32,
    role: &str,
    text: Option<&str>,
    attachment_path: Option<&str>,
) -> Result<Message, String> {
    state
        .db
        .lock()
        .unwrap()
        .add_message(session_id, role, text, attachment_path)
        .map_err(|err| err.to_string())
}
