import { useMemo } from "react";

import { eventEmitterInstance } from "../event-emitter-instance";
import { Publish } from "../models/event-emitter";

export const usePublish = (): Publish => {
  const instance = useMemo(() => eventEmitterInstance, []);

  return instance.publish.bind(instance);
};