import { createContext } from 'react';

import { EventEmitter } from './util/event-emitter';

export const EventEmitterContext = createContext<EventEmitter>(new EventEmitter());