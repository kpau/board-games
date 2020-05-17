import {
  ActionMethod,
  ActionConfig,
  getControllerConfig,
  setControllerConfig,
  getActionConfig,
  setActionConfig,
} from '../config';
import { ActionName } from '../action';

export default function action<TCtrl extends Record<string, any>>(method: ActionMethod, path = '/') {
  const newActionConfig: ActionConfig<any[]> = {
    method,
    path,
  };

  return function actionDecorator(
    ctrlProto: TCtrl,
    actionName: ActionName<TCtrl>,
  ): void {
    const ctrlConfig = getControllerConfig<typeof ctrlProto>(ctrlProto);
    ctrlConfig.actions = ctrlConfig.actions || [];
    ctrlConfig.actions.push(actionName);
    setControllerConfig(ctrlProto, ctrlConfig);

    const actionConfig = getActionConfig(ctrlProto, actionName);
    actionConfig.method = newActionConfig.method;
    actionConfig.path = newActionConfig.path;
    actionConfig.args = actionConfig.args || [];
    setActionConfig(ctrlProto, actionName, actionConfig);
  };
}
