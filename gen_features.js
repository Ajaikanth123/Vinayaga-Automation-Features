const fs = require('fs');

const html_template = `
    <!-- Vertical Features Section -->
    <section class="features-vertical-section">
        <div class="features-vertical-header">
            <h2>Enterprise Feature Overview</h2>
            <p>17 powerful modules built for diagnostic centers.</p>
        </div>
        <div class="vertical-timeline-container">
__ITEMS__
        </div>
    </section>
`;

const item_template = `            <div class="v-feature-row __ANIM_CLASS__">
                <div class="v-feature-content">
                    <div class="v-feature-number">__NUM__</div>
                    <div class="v-feature-text">
                        <h3>__TITLE__</h3>
                        <p class="v-desc"><strong>Feature:</strong> __DESC__</p>
                        <p class="v-adv"><strong>Advantage:</strong> __ADV__</p>
                    </div>
                </div>
            </div>
`;

const data = [
    ["Patient Referral Form System", "Digital form for doctors to submit scan requests with patient details, scan type, and tooth selection.", "Eliminates paper-based referral forms and keeps patient scan requests digitally organized."],
    ["Patient ID Generation", "Automatic unique patient ID generation during referral submission.", "Ensures accurate scan tracking and patient identification."],
    ["Scan Upload System", "Secure upload interface for DICOM scan files mapped with patient ID and scan details.", "Simplifies scan storage and management while maintaining organized patient records."],
    ["Cloud Scan Storage", "Secure storage system for large DICOM scan files using centralized cloud infrastructure.", "Provides safe long-term storage and allows easy retrieval of scan data from anywhere."],
    ["Web-Based DICOM Viewer", "Browser-based DICOM viewer with zoom, pan, slice navigation, and scan visualization.", "Doctors can view scans instantly without installing specialized software."],
    ["Automated Scan Sharing", "Automatic generation of secure viewing links once the scan upload is completed.", "Enables instant scan sharing with doctors and reduces manual communication."],
    ["WhatsApp Notification Automation", "Automated notification system that sends scan-ready alerts to doctors through WhatsApp.", "Improves communication speed and ensures doctors receive scan updates immediately."],
    ["Email Notification System", "Automated email alerts containing secure scan viewing links.", "Provides reliable communication and ensures scan delivery through official channels."],
    ["Admin Dashboard", "Centralized dashboard for managing users, scan uploads, patient records, and system activity.", "Provides complete operational control and system monitoring for administrators."],
    ["Multi-Branch Management", "Support for managing multiple diagnostic center branches within one centralized platform.", "Ideal for enterprise diagnostic centers and allows easy branch-level management."],
    ["Role-Based Access Control", "Different system roles for administrators, staff members, and doctors with controlled permissions.", "Improves system security and prevents unauthorized data access."],
    ["Secure Scan Access Links", "Encrypted and time-limited scan viewing links for doctors.", "Ensures only authorized users can access sensitive patient scan data."],
    ["Activity Logs", "System logs that record user actions such as scan access, uploads, and login activity.", "Provides accountability and supports system monitoring and auditing."],
    ["Search & Patient Lookup", "Advanced search system to find scans using patient name, ID, or scan date.", "Enables fast and efficient retrieval of patient scan records."],
    ["Mobile-Friendly Viewer", "Fully responsive viewer allowing doctors to access scans through mobile devices or tablets.", "Doctors can view scans anytime and anywhere without being limited to desktop systems."],
    ["Data Encryption", "Encryption system for protecting stored medical scan data and patient information.", "Protects sensitive healthcare information and improves data security."],
    ["Dedicated Clinic Website Service", "Development of a dedicated website for the clinic integrated with the DICOM CONNECT platform for scan access and digital services.", "Helps clinics build a strong online presence and allows patients or doctors to access scan reports through the clinic's branded website."],
    ["2D OPG Image Transfer Service", "High-quality 2D OPG scan transfer module sent before the main 3D scan.", "Provides immediate diagnostic value to doctors before the larger scan files are processed."],
    ["Send Scan Report to Patient", "Direct digital delivery of diagnostic reports to patients via secure encrypted links.", "Enhances patient experience and reduces manual report collection efforts."],
    ["3-Day Secure Link Validity", "Automatic expiration of scan viewing links after 72 hours for enhanced data security.", "Ensures patient privacy by limiting the exposure time of sensitive medical data."],
    ["Facebook Meta Business Verification", "Integration and verification with Meta Business Suite for official clinical communication.", "Builds clinic trust and enables advanced communication features through Meta platforms."]
];

let items_str = "";
data.forEach((item, index) => {
    let num = index + 1;
    let anim_class = num % 2 !== 0 ? "from-right" : "from-left";
    let formatted_item = item_template
        .replace('__NUM__', num)
        .replace('__TITLE__', item[0])
        .replace('__DESC__', item[1])
        .replace('__ADV__', item[2])
        .replace('__ANIM_CLASS__', anim_class);
    items_str += formatted_item;
});

let section_html = html_template.replace('__ITEMS__', items_str);

let content = fs.readFileSync('c:/Users/Lenovo/Music/New folder/index.html', 'utf-8');

if (!content.includes('<!-- Vertical Features Section -->')) {
    content = content.replace('    <script src="script.js"></script>', section_html + '    <script src="script.js"></script>');
    fs.writeFileSync('c:/Users/Lenovo/Music/New folder/index.html', content, 'utf-8');
    console.log("Added features section to HTML.");
} else {
    console.log("Section already exists.");
}
