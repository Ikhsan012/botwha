const { readFileSync, writeFileSync, existsSync } = require('fs')

/**
 * @type {import('@adiwajshing/baileys')}
 */
const { initAuthCreds, BufferJSON, proto } = require('@whiskeysockets/baileys')

/**
 * @param {import('@adiwajshing/baileys').WASocket | import('@adiwajshing/baileys').WALegacySocket}
 */
function bind(conn) {
    /**
     * 
     * @param {import('@adiwajshing/baileys').Contact[]|{contacts:import('@adiwajshing/baileys').Contact[]}} contacts 
     * @returns 
     */
    function updateNameToDb(contacts) {
        if (!contacts) return
        try {
            contacts = contacts.contacts || contacts
            for (const contact of contacts) {
                const id = conn.decodeJid(contact.id)
                if (!id || id === 'status@broadcast') continue
                let chats = conn.chats[id]
                if (!chats) chats = conn.chats[id] = { ...contact, id }
                conn.chats[id] = {
                    ...chats,
                    ...({
                        ...contact, id, ...(id.endsWith('@g.us') ?
                            { subject: contact.subject || contact.name || chats.subject || '' } :
                            { name: contact.notify || contact.name || chats.name || chats.notify || '' })
                    } || {})
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

const KEY_MAP = {
    'pre-key': 'preKeys',
    'session': 'sessions',
    'sender-key': 'senderKeys',
    'app-state-sync-key': 'appStateSyncKeys',
    'app-state-sync-version': 'appStateVersions',
    'sender-key-memory': 'senderKeyMemory'
}