import re

html_template = """
    <!-- Vertical Features Section -->
    <section class="features-vertical-section">
        <div class="features-vertical-header">
            <h2>Enterprise Feature Overview</h2>
            <p>17 powerful modules built for diagnostic centers.</p>
        </div>
        <div class="vertical-timeline-container">
{items}
        </div>
    </section>
"""

item_template = """            <div class="v-feature-row {anim_class}">
                <div class="v-feature-content">
                    <div class="v-feature-number">{num}</div>
                    <div class="v-feature-text">
                        <h3>{title}</h3>
                        <p class="v-desc"><strong>Feature:</strong> {desc}</p>
                        <p class="v-adv"><strong>Advantage:</strong> {adv}</p>
                    </div>
                </div>
            </div>
"""

data = [
    ("Patient Referral Form System", "Digital form for doctors to submit scan requests with patient details, scan type, and tooth selection.", "Eliminates paper-based referral forms and keeps patient scan requests digitally organized."),
    ("Patient ID Generation", "Automatic unique patient ID generation during referral submission.", "Ensures accurate scan tracking and patient identification."),
    ("Scan Upload System", "Secure upload interface for DICOM scan files mapped with patient ID and scan details.", "Simplifies scan storage and management while maintaining organized patient records."),
    ("Cloud Scan Storage", "Secure storage system for large DICOM scan files using centralized cloud infrastructure.", "Provides safe long-term storage and allows easy retrieval of scan data from anywhere."),
    ("Web-Based DICOM Viewer", "Browser-based DICOM viewer with zoom, pan, slice navigation, and scan visualization.", "Doctors can view scans instantly without installing specialized software."),
    ("Automated Scan Sharing", "Automatic generation of secure viewing links once the scan upload is completed.", "Enables instant scan sharing with doctors and reduces manual communication."),
    ("WhatsApp Notification Automation", "Automated notification system that sends scan-ready alerts to doctors through WhatsApp.", "Improves communication speed and ensures doctors receive scan updates immediately."),
    ("Email Notification System", "Automated email alerts containing secure scan viewing links.", "Provides reliable communication and ensures scan delivery through official channels."),
    ("Admin Dashboard", "Centralized dashboard for managing users, scan uploads, patient records, and system activity.", "Provides complete operational control and system monitoring for administrators."),
    ("Multi-Branch Management", "Support for managing multiple diagnostic center branches within one centralized platform.", "Ideal for enterprise diagnostic centers and allows easy branch-level management."),
    ("Role-Based Access Control", "Different system roles for administrators, staff members, and doctors with controlled permissions.", "Improves system security and prevents unauthorized data access."),
    ("Secure Scan Access Links", "Encrypted and time-limited scan viewing links for doctors.", "Ensures only authorized users can access sensitive patient scan data."),
    ("Activity Logs", "System logs that record user actions such as scan access, uploads, and login activity.", "Provides accountability and supports system monitoring and auditing."),
    ("Search & Patient Lookup", "Advanced search system to find scans using patient name, ID, or scan date.", "Enables fast and efficient retrieval of patient scan records."),
    ("Mobile-Friendly Viewer", "Fully responsive viewer allowing doctors to access scans through mobile devices or tablets.", "Doctors can view scans anytime and anywhere without being limited to desktop systems."),
    ("Data Encryption", "Encryption system for protecting stored medical scan data and patient information.", "Protects sensitive healthcare information and improves data security."),
    ("Dedicated Clinic Website Service", "Development of a dedicated website for the clinic integrated with the DICOM CONNECT platform for scan access and digital services.", "Helps clinics build a strong online presence and allows patients or doctors to access scan reports through the clinic's branded website.")
]

items_str = ""
for i, (title, desc, adv) in enumerate(data):
    num = i + 1
    # Odd numbers come from right (so right side of timeline), even from left
    anim_class = "from-right" if num % 2 != 0 else "from-left"
    items_str += item_template.format(num=num, title=title, desc=desc, adv=adv, anim_class=anim_class)

section_html = html_template.format(items=items_str)

with open('c:/Users/Lenovo/Music/New folder/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before <script src="script.js"></script>
if '<!-- Vertical Features Section -->' not in content:
    content = content.replace('    <script src="script.js"></script>', section_html + '    <script src="script.js"></script>')
    with open('c:/Users/Lenovo/Music/New folder/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added features section to HTML.")
else:
    print("Section already exists.")
