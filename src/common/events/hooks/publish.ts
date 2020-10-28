import { useMemo } from "react";

import { eventEmitterInstance } from "../event-emitter-instance";
import { IEventEmitter } from "../models/event-emitter";

type PublishHook = Pick<IEventEmitter, "publish">;

export const usePublish = (): PublishHook => {
  const instance = useMemo(() => eventEmitterInstance, []);

  return {
    publish: instance.publish.bind(instance)
  };
};