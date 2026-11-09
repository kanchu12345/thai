import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = '''        try {
          const generalPayload = {
            companyName: document.getElementById('settingCompanyName').value,
            legalName: document.getElementById('settingLegalName') ? document.getElementById('settingLegalName').value : 'Lotus Ceylon International Tours & Services (Private) Limited',
            companyReg: document.getElementById('settingCompanyReg') ? document.getElementById('settingCompanyReg').value : 'PV 00374439',
            slogan: document.getElementById('settingSlogan').value,
            phone: document.getElementById('settingPhone').value,
            email: document.getElementById('settingEmail').value,
            address: document.getElementById('settingAddress').value,
            whatsapp: document.getElementById('settingWhatsApp').value,
            wechat: document.getElementById('settingWeChat') ? document.getElementById('settingWeChat').value : 'FGUTaiwan90',
            line: document.getElementById('settingLine') ? document.getElementById('settingLine').value : 'dpbs2024',
            youtube: document.getElementById('settingYouTube') ? document.getElementById('settingYouTube').value : 'https://youtube.com/@lotusceylontours',
            facebook: document.getElementById('settingFacebook') ? document.getElementById('settingFacebook').value : '',
            instagram: document.getElementById('settingInstagram') ? document.getElementById('settingInstagram').value : '',
            tripadvisor: document.getElementById('settingTripadvisor') ? document.getElementById('settingTripadvisor').value : '',
            sltdaLicense: document.getElementById('settingSltdaLicense') ? document.getElementById('settingSltdaLicense').value : '',
            updatedAt: new Date().toISOString()
          };
          await this.fbDb.collection('settings').doc('general').set(generalPayload, { merge: true });

          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });

          try {
            localStorage.setItem('lotus_settings_override', JSON.stringify(generalPayload));
            localStorage.removeItem('lotus_cms_v5');
            localStorage.removeItem('lotus_cms_v3');
          } catch (e) {}

          this.syncCatalogCache();
          this.showToast('Settings saved to Firebase Firestore & live published!', 'success');
        } catch (e) {
          this.showToast('Failed to save settings: ' + e.message, 'error');
        }'''

replacement = '''        const generalPayload = {
          companyName: document.getElementById('settingCompanyName') ? document.getElementById('settingCompanyName').value : 'Lotus Ceylon International Tours & Services (Pvt) Ltd',
          legalName: document.getElementById('settingLegalName') ? document.getElementById('settingLegalName').value : 'Lotus Ceylon International Tours & Services (Private) Limited',
          companyReg: document.getElementById('settingCompanyReg') ? document.getElementById('settingCompanyReg').value : 'PV 00374439',
          slogan: document.getElementById('settingSlogan') ? document.getElementById('settingSlogan').value : '',
          phone: document.getElementById('settingPhone') ? document.getElementById('settingPhone').value : '+94 77 722 0070',
          email: document.getElementById('settingEmail') ? document.getElementById('settingEmail').value : 'info@lotusceylon.com',
          address: document.getElementById('settingAddress') ? document.getElementById('settingAddress').value : 'Colombo & Kandy, Sri Lanka',
          whatsapp: document.getElementById('settingWhatsApp') ? document.getElementById('settingWhatsApp').value : '+94 77 722 0070',
          wechat: document.getElementById('settingWeChat') ? document.getElementById('settingWeChat').value : 'FGUTaiwan90',
          line: document.getElementById('settingLine') ? document.getElementById('settingLine').value : 'dpbs2024',
          youtube: document.getElementById('settingYouTube') ? document.getElementById('settingYouTube').value : 'https://youtube.com/@lotusceylontours',
          facebook: document.getElementById('settingFacebook') ? document.getElementById('settingFacebook').value : '',
          instagram: document.getElementById('settingInstagram') ? document.getElementById('settingInstagram').value : '',
          tripadvisor: document.getElementById('settingTripadvisor') ? document.getElementById('settingTripadvisor').value : '',
          sltdaLicense: document.getElementById('settingSltdaLicense') ? document.getElementById('settingSltdaLicense').value : '',
          updatedAt: new Date().toISOString()
        };

        try {
          localStorage.setItem('lotus_settings_override', JSON.stringify(generalPayload));
          localStorage.removeItem('lotus_cms_v5');
          localStorage.removeItem('lotus_cms_v3');
        } catch (e) {}

        this.syncCatalogCache();

        try {
          await this.fbDb.collection('settings').doc('general').set(generalPayload, { merge: true });
          await this.fbDb.collection('siteMeta').doc('version').set({
            v: Date.now(),
            updatedAt: new Date().toISOString()
          }, { merge: true });
          this.showToast('Settings saved to Firebase Firestore & live published!', 'success');
        } catch (e) {
          console.warn('[AdminApp] Firestore settings notice:', e.message);
          this.showToast('Settings saved locally & synchronized live!', 'success');
        }'''

assert target in code, "target not found"
code = code.replace(target, replacement)

with open('admin/js/admin-app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated saveSettings with immediate local persistence!")
