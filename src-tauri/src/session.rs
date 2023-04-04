use rusqlite::{params, Connection, Error};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub id: i32,
    pub session_id: i32,
    pub role: String,
    pub text: Option<String>,
    pub attachment_path: Option<String>,
}

pub struct Database {
    pub conn: Connection,
}

impl Database {
    pub fn new(file_path: impl AsRef<std::path::Path>) -> Result<Database, Error> {
        let conn = Connection::open(file_path)?;
        Database::init_database(&conn)?;
        Ok(Database { conn })
    }

    pub fn add_session(&mut self, name: &str) -> Result<Session, Error> {
        let mut tx = self.conn.transaction()?;
        tx.execute("INSERT INTO sessions (name) VALUES (?)", &[name])?;
        let id = tx.last_insert_rowid() as i32;
        tx.commit()?;
        Ok(Session {
            id,
            name: name.to_string(),
        })
    }

    pub fn get_all_sessions(&mut self) -> Result<Vec<Session>, Error> {
        let mut stmt = self.conn.prepare("SELECT id, name FROM sessions")?;
        let session_iter = stmt.query_map([], |row| {
            Ok(Session {
                id: row.get(0)?,
                name: row.get(1)?,
            })
        })?;
        let mut sessions = Vec::new();
        for session_result in session_iter {
            sessions.push(session_result?);
        }
        Ok(sessions)
    }

    pub fn add_message(
        &mut self,
        session_id: i32,
        role: &str,
        text: Option<&str>,
        attachment_path: Option<&str>,
    ) -> Result<Message, Error> {
        let mut tx = self.conn.transaction()?;
        tx.execute(
            "INSERT INTO messages (session_id, role) VALUES (?, ?)",
            params![session_id, role],
        )?;
        let id: i32 = tx.last_insert_rowid() as i32;

        if let Some(text) = text {
            tx.execute(
                "INSERT INTO message_texts (message_id, text) VALUES (?, ?)",
                params![id, text],
            )?;
        }
        if let Some(attachment_path) = attachment_path {
            tx.execute(
                "INSERT INTO message_attachments (message_id, path) VALUES (?, ?)",
                params![id, attachment_path],
            )?;
        }
        tx.commit()?;
        Ok(Message {
            id,
            session_id,
            role: role.to_owned(),
            text: text.map(|s| s.to_string()),
            attachment_path: attachment_path.map(|s| s.to_string()),
        })
    }

    pub fn get_all_messages(&self, session_id: i32) -> Result<Vec<Message>, Error> {
        let mut stmt = self.conn.prepare(
            "SELECT messages.id, messages.role,  message_texts.text, message_attachments.path
                 FROM messages
                 LEFT JOIN message_texts ON messages.id=message_texts.message_id
                 LEFT JOIN message_attachments ON messages.id=message_attachments.message_id
                 WHERE messages.session_id=?",
        )?;
        let message_iter = stmt.query_map(&[&session_id], |row| {
            Ok(Message {
                id: row.get(0)?,
                session_id: session_id,
                role: row.get(1)?,
                text: row.get(3)?,
                attachment_path: row.get(4)?,
            })
        })?;
        let mut messages = Vec::new();
        for message_result in message_iter {
            messages.push(message_result?);
        }
        Ok(messages)
    }

    fn init_database(conn: &Connection) -> Result<(), Error> {
        // conn.execute("DROP TABLE  sessions;", [])?;
        // conn.execute("DROP TABLE messages;", [])?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS sessions (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 name TEXT NOT NULL
            )",
            [],
        )?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS messages (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 session_id INTEGER NOT NULL,
                 role TEXT NOT NULL
            )",
            [],
        )?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS message_texts (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 message_id INTEGER NOT NULL,
                 text TEXT NOT NULL
            )",
            [],
        )?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS message_attachments (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 message_id INTEGER NOT NULL,
                 path TEXT NOT NULL
            )",
            [],
        )?;
        conn.execute(
            "CREATE INDEX IF NOT EXISTS message_session_idx ON messages (session_id)",
            [],
        )?;
        conn.execute(
            "CREATE INDEX IF NOT EXISTS message_texts_message_idx ON message_texts (message_id)",
            [],
        )?;
        conn.execute("CREATE INDEX IF NOT EXISTS message_attachments_message_idx ON message_attachments (message_id)", [])?;
        Ok(())
    }
}
