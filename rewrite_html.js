const fs = require('fs');

const html_template = `
    <!-- Vertical Features Section -->
    <section class="features-vertical-section">
        <div class="features-vertical-header">
            <h2>Enterprise Feature Overview</h2>
            <p>17 powerful modules built for diagnostic centers.</p>
        </div>
        <div class="vertical-timeline-container">
__ITEMS__        </div>
    </section>
`;

const item_template = `            <div class="v-feature-row __ANIM_CLASS__">
                <div class="v-feature-number">__NUM__</div>
                <div class="v-feature-content">
                    <div class="v-feature-icon-wrapper">
                        <span class="material-symbols-rounded v-feature-icon">__ICON__</span>
                    </div>
                    <div class="v-feature-text">
                        <h3>__TITLE__</h3>
                        <p class="v-desc">__DESC__</p>
                    </div>
                </div>
            </div>
`;

const data = [
    ["Patient Referral Form System", "Digital form for doctors to submit scan requests with patient details, scan type, and tooth selection.", "assignment"],
    ["Patient ID Generation", "Automatic unique patient ID generation during referral submission.", "badge"],
    ["Scan Upload System", "Secure upload interface for DICOM scan files mapped with patient ID and scan details.", "cloud_upload"],
    ["Cloud Scan Storage", "Secure storage system for large DICOM scan files using centralized cloud infrastructure.", "cloud"],
    ["Web-Based DICOM Viewer", "Browser-based DICOM viewer with zoom, pan, slice navigation, and scan visualization.", "preview"],
    ["Automated Scan Sharing", "Automatic generation of secure viewing links once the scan upload is completed.", "share"],
    ["WhatsApp Notification Automation", "Automated notification system that sends scan-ready alerts to doctors through WhatsApp.", "chat"],
    ["Email Notification System", "Automated email alerts containing secure scan viewing links.", "mail"],
    ["Admin Dashboard", "Centralized dashboard for managing users, scan uploads, patient records, and system activity.", "dashboard"],
    ["Multi-Branch Management", "Support for managing multiple diagnostic center branches within one centralized platform.", "account_tree"],
    ["Role-Based Access Control", "Different system roles for administrators, staff members, and doctors with controlled permissions.", "admin_panel_settings"],
    ["Secure Scan Access Links", "Encrypted and time-limited scan viewing links for doctors.", "link"],
    ["Activity Logs", "System logs that record user actions such as scan access, uploads, and login activity.", "troubleshoot"],
    ["Search & Patient Lookup", "Advanced search system to find scans using patient name, ID, or scan date.", "manage_search"],
    ["Mobile-Friendly Viewer", "Fully responsive viewer allowing doctors to access scans through mobile devices or tablets.", "smartphone"],
    ["Data Encryption", "Encryption system for protecting stored medical scan data and patient information.", "enhanced_encryption"],
    ["Dedicated Clinic Website Service", "Development of a dedicated website for the clinic integrated with the DICOM CONNECT platform.", "web"]
];

let items_str = "";
data.forEach((item, index) => {
    let num = index + 1;
    let anim_class = num % 2 !== 0 ? "from-right" : "from-left";
    let formatted_item = item_template
        .replace('__NUM__', num)
        .replace('__TITLE__', item[0])
        .replace('__DESC__', item[1])
        .replace('__ICON__', item[2])
        .replace('__ANIM_CLASS__', anim_class);
    items_str += formatted_item;
});

let section_html = html_template.replace('__ITEMS__', items_str);

let content = fs.readFileSync('c:/Users/Lenovo/Music/New folder/index.html', 'utf-8');

// Replace everything from <!-- Vertical Features Section --> to </section> inclusive
const regex = /<!-- Vertical Features Section -->[\s\S]*?<\/section>/;
if (regex.test(content)) {
    content = content.replace(regex, section_html.trim());
    fs.writeFileSync('c:/Users/Lenovo/Music/New folder/index.html', content, 'utf-8');
    console.log("Successfully replaced features section in HTML.");
} else {
    console.log("Section not found, maybe append it manually.");
}
