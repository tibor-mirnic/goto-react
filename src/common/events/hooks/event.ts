import { useEffect, useMemo } from "react";

import { eventEmitterInstance } from "../event-emitter-instance";
import { Handler } from "../models/handler";

export const useEvent = <T>(eventName: string, handler: Handler<T>) => {
  const instance = useMemo(() => eventEmitterInstance, []);

  useEffect(() => {
    instance.subscribe(eventName, handler);

    return () => instance.unsubscribe(eventName, handler)
  }, [eventName, handler]);
};