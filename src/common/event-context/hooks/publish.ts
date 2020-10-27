import { useContext } from "react";

import { EventEmitterContext } from "../event-emitter-context";

import { Publish } from "../models/event-emitter";

export const usePublish = (): Publish => {
  const context = useContext(EventEmitterContext);

  return context.publish.bind(context);
};