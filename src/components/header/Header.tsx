import { Logo } from '../../shared/components';

import { Title } from './title/Title';
import { ToggleTheme } from './toggle-theme/ToggleTheme';
import { ToggleLanguage } from './toggle-language/ToggleLanguage';

import './Header.scss';

export function Header() {
    return (
        <>
            <div className="header">
                <div className="header__main">
                    <Logo />
                    <Title />
                </div>

                <div className="header__actions">
                    <ToggleLanguage />
                    <ToggleTheme />
                </div>
            </div>
        </>
    );
}
