import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Dropdown, { Option } from 'react-dropdown';

import { AppDispatch, RootState } from '../../../data-access/store/store';
import { setLang } from '../../../data-access/store/languageSlice';

import './ToggleLanguage.scss';

export const ToggleLanguage = memo(() => {
    const { i18n } = useTranslation();

    const { lang, langs } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [i18n, lang]);

    const onChangeLang = useCallback(
        (langOption: Option) => {
            dispatch(setLang(langOption.value));
        },
        [dispatch]
    );

    return (
        <>
            <div className="toggle-language__container">
                <Dropdown
                    className="toggle-language__dropdown"
                    options={langs}
                    onChange={onChangeLang}
                    value={lang}
                    placeholder="Select an option"
                />
            </div>
        </>
    );
});
