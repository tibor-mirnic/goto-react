import { useContext, useEffect } from "react";

import { EventEmitterContext } from "../event-emitter-context";
import { Handler } from "../models/handler";

export const useEvent = <T>(eventName: string, handler: Handler<T>) => {
  const context = useContext(EventEmitterContext);

  useEffect(() => {
    context.subscribe(eventName, handler);

    return () => context.unsubscribe(eventName, handler)
  }, [eventName, handler]);
};