import React, { Component } from 'react';
import ft from '../css/footer.module.css';

class Footer extends Component {
    state = {
    }
    render() {
        return (
            <footer className={ft.footer}>
                <div className={"container "+ft.myFooter}>
                    <div className={"row "+ft.footerRow}>
                        <div className={"col-md-3  col-sm-12 "+ft.footerLogoP}>
                            <div className={ft.footerLogo}></div>
                            <p className={ft.footerComesee}>© ComeSee 看戲 版權所有</p>
                        </div>
                        <div className={"col-md-5 col-sm-12 "+ft.footerA}>
                            <a href="/SupportCenter/FAQpage">常見問題</a>
                            <a href="/SupportCenter/Contact">聯絡我們</a>
                            <a href="/SupportCenter/Privacy">隱私權政策</a>
                            <a href="/SupportCenter/Service">服務條款</a>
                        </div>
                        <div className={"col-md-4 col-sm-12 "+ft.footerContent}>
                            <div>票務服務單位 : 看戲股份有限公司／統一編號 12342234</div>
                            <div>客服專線 : <a href="tel:+886 (04) 2234-3234">+886 (04) 2234-3234</a></div>
                            <div>客服信箱 : <a href="mailto:support@comesee.com">support@comesee.com</a></div>
                            <div>客服時間 : 週一 ~ 週五 10:00-12:30 | 13:30-18:00(適逢國定假日暫停服務)</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;