import { defineStore } from 'pinia'
import { readStorage, writeStorage } from '../utils/storage'
import type { ChatMessage } from '../types'

interface Session {
  id: string
  title: string
  messages: ChatMessage[]
}

export const useAgentStore = defineStore('agent', {
  state: () => ({
    sessions: readStorage<Session[]>('agent-sessions', []),
    activeSessionId: readStorage<string>('agent-active-session', '')
  }),
  getters: {
    activeSession(state) {
      return state.sessions.find((session) => session.id === state.activeSessionId)
    }
  },
  actions: {
    setSessions(sessions: Session[]) {
      this.sessions = sessions
      writeStorage('agent-sessions', sessions)
    },
    setActiveSession(sessionId: string) {
      this.activeSessionId = sessionId
      writeStorage('agent-active-session', sessionId)
    },
    upsertSession(session: Session) {
      const next = [...this.sessions]
      const index = next.findIndex((item) => item.id === session.id)
      if (index >= 0) {
        next[index] = session
      } else {
        next.unshift(session)
      }
      this.setSessions(next)
      this.setActiveSession(session.id)
    }
  }
})
