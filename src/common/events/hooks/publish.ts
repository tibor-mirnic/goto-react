import { useMemo } from "react";

import { eventEmitterInstance } from "../event-emitter-instance";
import { IEventEmitter } from "../models/event-emitter";

type PuhlishHook = Pick<IEventEmitter, "publish">;

export const usePublish = (): PuhlishHook => {
  const instance = useMemo(() => eventEmitterInstance, []);

  return {
    publish: instance.publish.bind(instance)
  };
};