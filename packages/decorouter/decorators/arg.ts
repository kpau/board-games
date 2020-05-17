import {
  ArgSource, ArgCast, ArgConfig, getActionConfig, setActionConfig,
} from '../config';
import { ActionName } from '../action';

export default function arg<T = string>(
  source: ArgSource,
  name: string,
  required = true,
  cast: ArgCast<T> = ((v: string): T => v as unknown as T),
): ParameterDecorator {
  const argConfig: ArgConfig<T> = {
    name,
    source,
    required,
    cast,
  };

  return function paramDecorator<TCtrl extends Record<string, any>>(
    ctrlProto: TCtrl,
    actionName: ActionName<TCtrl>,
    paramIndex: number,
  ): void {
    const actionConfig = getActionConfig(ctrlProto, actionName);
    actionConfig.args = actionConfig.args || [];
    actionConfig.args[paramIndex] = argConfig;
    setActionConfig(ctrlProto, actionName, actionConfig);
  };
}
