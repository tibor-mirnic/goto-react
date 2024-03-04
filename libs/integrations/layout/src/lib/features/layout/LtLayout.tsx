import { useSecurityContextSelector } from 'domain/shared';
import { FC, MouseEventHandler, useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { useAvailableModules } from './hooks';

export const LtLayout: FC = () => {
  const getUser = useSecurityContextSelector((a) => a.getUser);
  const logout = useSecurityContextSelector((a) => a.logout);
  const { currentModule, availableModules, onModuleChange } = useAvailableModules();

  const onLogOut: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    logout();
  }, [logout]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="lt-layout">
      <div className="lt-layout-header">
        <label htmlFor="available-modules">
          Navigate to:
          <select role="combobox" id="available-modules" defaultValue={currentModule.id} onChange={onModuleChange}>
            {availableModules.map((a) => (
              <option key={a.id} value={a.id}>
                {a.displayName}
              </option>
            ))}
          </select>
        </label>
        <span className="lt-layout-header-spacer">&nbsp;</span>
        <div className="lt-layout-header-user">{getUser().displayName || 'N/A'}</div>
        <button type="button" className="lt-layout-header-logout" onClick={onLogOut}>
          Log Out
        </button>
      </div>

      <div className="lt-layout-content">
        <Outlet />
      </div>

      <div className="lt-layout-footer">© GotoReact {currentYear}</div>
    </div>
  );
};

export default LtLayout;
