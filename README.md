# 📋 Santé of Mesa - CNA Master Shift Report & Brain Sheet System

An open-source, high-efficiency CNA (Certified Nursing Assistant) Shift Brain & Handoff Report Sheet designed specifically for skilled nursing and post-acute rehabilitation centers (such as **Santé of Mesa**).

This system solves the dual challenge of **paper printing** and **digital cloud documentation**:
1. **Black & White High-Contrast Print Mode**: Pure monochrome grid layout optimized for facility laser printers. Zero wasted ink, crisp borders, and dedicated handwriting space for shift trackers (Vitals, Meals, Bowel Movements, Showers, Turning Q2H).
2. **Digital & Cloud Interactive Mode**: Modern web application interface with quick-fill resident forms, auto-saving local storage, multi-layout options (12-resident, 8-resident, 4-resident high-acuity), and JSON export/import for cloud backup (Google Drive, Google Docs, OneDrive).

---

## 🌟 Key Features

- **Dual-Mode Ergonomics**:
  - **Screen**: High-contrast dark theme UI with quick edit modals and Lucide vector icons.
  - **Print**: Vectorized `@media print` layout that automatically converts to pure black-and-white grid lines for maximum printer legibility and toner conservation.
- **Multiple Layout Formats**:
  - **12-Resident Grid**: Compact 1-page assignment sheet for high-volume shifts.
  - **8-Resident Grid**: Standard skilled nursing assignment sheet.
  - **4-Resident Grid**: High-acuity / detailed rehabilitation care plan view.
  - **1-Resident Sheet**: Comprehensive single-patient care sheet.
- **Essential CNA Clinical Fields**:
  - Room # & Resident Name
  - Code Status (Full Code, DNR, DNR/DNI, POLST)
  - Diet & Fluid Restrictions (Regular, Mech Soft, Puree, Honey Thick, NPO, 1500mL Restr, Feed Assist)
  - Mobility & Transfer Assist Levels (Independent, 1PA, 2PA, S2S, Hoyer Lift)
  - Continence & Elimination (Brief Size, Foley Catheter, Ostomy, BM Tracking)
  - Shower & Bath Schedules
  - Vitals & Accu-Chek / Blood Sugar Schedules
  - Safety & Precautions (Fall Risk, Bed Low, Alarm, Contact Isolation, O2 Therapy)
  - Shift Focus Notes & Behaviors (Reposition Q2H, Dementia, Sundowning, Wound Prep)
- **Shift Legend & Hand-off Signatures**: Built-in standardized clinical abbreviation legend and shift handoff sign-off lines.
- **Cloud & File Backup**: One-click JSON backup export and load feature.

---

## 🛠️ Usage Instructions

### Running Locally
Simply open `index.html` in any web browser (Safari, Chrome, Firefox, Edge) — no build steps or servers required!

### Printing Mass Paper Copies
1. Click **"Print B&W Sheet"** in the top navigation bar or press `Cmd+P` / `Ctrl+P`.
2. Ensure your printer destination is set to **Landscape** orientation.
3. Print crisp, high-density handoff sheets for your shift.

---

## 📂 File Structure

```text
Report_Sheet/
├── index.html     # Application structure & print layouts
├── styles.css     # Dark mode screen styles + @media print monochrome rules
├── app.js         # State management, demo data, local storage & JSON export
└── README.md      # Documentation & quick start guide
```

---

## 📄 License

Open-Source for Nursing Assistants and Healthcare Facilities worldwide. Free to use, modify, and distribute.
