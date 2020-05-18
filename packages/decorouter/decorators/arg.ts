import {
  ArgSource, ArgParser, ArgConfig, getActionConfig, setActionConfig,
} from '../config';
import { ActionName } from '../action';

function arg<T>(
  source: ArgSource,
  name: string,
  parse: ArgParser<T>,
  required = true,
): ParameterDecorator {
  const argConfig: ArgConfig<T> = {
    name,
    source,
    parse,
    required,
  };

  return function argDecorator<TCtrl extends Record<string, any>>(
    ctrlProto: TCtrl,
    actionName: ActionName<TCtrl>,
    paramIndex: number,
  ): void {
    const actionConfig = getActionConfig(ctrlProto, actionName);
    actionConfig.args = actionConfig.args || [];
    actionConfig.args[paramIndex] = argConfig;
    setActionConfig(ctrlProto, actionName, actionConfig);
  } as ParameterDecorator;
}

export default arg;
