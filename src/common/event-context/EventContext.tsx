import React, { FC, useMemo } from "react";

import { EventEmitterContext } from './event-emitter-context';
import { EventEmitter } from "./util/event-emitter";

export const EventContext: FC = props => {
  const eventEmitter = useMemo(() => new EventEmitter(), []);

  return (
    <EventEmitterContext.Provider value={eventEmitter}>
      { props.children }
    </EventEmitterContext.Provider>
  );
};