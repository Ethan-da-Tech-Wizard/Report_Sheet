// SANTÉ OF MESA - CNA MASTER REPORT SHEET LOGIC
// Phase 1: Easy Wins — Auto-detect, sticky profiles, persistent state

// ============================================================
// DEFAULT DEMO RESIDENTS (Only loaded when user clicks "Demo Data")
// ============================================================
const sampleResidents = [
  {
    id: "res-1",
    room: "101-A",
    name: "Davis, Robert",
    codeStatus: "FULL CODE",
    diet: "Regular / Thin Liq",
    fluid: "Encourage Fluids",
    transfer: "1PA (1-Person Assist)",
    bowelBladder: "Brief L / Contine",
    adlLevel: "Setup Assist",
    shower: "Today EVE",
    vitalsFreq: "Q Shift (08/16)",
    safety: "Fall Risk / Alarm",
    accuChek: "AC & HS (BS)",
    notes: "Right hip post-op. Prefers walker. Reposition Q2H.",
    tasks: {}
  },
  {
    id: "res-2",
    room: "102-B",
    name: "Martinez, Elena",
    codeStatus: "DNR",
    diet: "Mechanical Soft",
    fluid: "1500mL Restr",
    transfer: "2PA / S2S Lift",
    bowelBladder: "Foley Catheter",
    adlLevel: "High Assist",
    shower: "Tue / Fri DAY",
    vitalsFreq: "Q4H Vitals",
    safety: "Bed Low / Mat",
    accuChek: "N/A",
    notes: "CHF history. Record strict I&O. Empty Foley Q Shift.",
    tasks: {}
  },
  {
    id: "res-3",
    room: "105-A",
    name: "Johnson, Clara",
    codeStatus: "DNR/DNI",
    diet: "Puree / Honey Thick",
    fluid: "Feed Assist",
    transfer: "Hoyer / Full Lift",
    bowelBladder: "Incontinent / Brief XL",
    adlLevel: "Total Care",
    shower: "Bed Bath Today",
    vitalsFreq: "Q Shift",
    safety: "O2 2L NC / Droplet",
    accuChek: "N/A",
    notes: "Aspiration risk. Sit 90° for meals & 30 min after.",
    tasks: {}
  },
  {
    id: "res-4",
    room: "108-B",
    name: "Wilson, Arthur",
    codeStatus: "FULL CODE",
    diet: "Regular / Cut Meat",
    fluid: "Independent",
    transfer: "Independent / Cane",
    bowelBladder: "Independent",
    adlLevel: "Independent",
    shower: "Mon / Thu NOC",
    vitalsFreq: "Q Shift",
    safety: "Self-Transfer",
    accuChek: "11:30 & 16:30",
    notes: "PT/OT at 10:00. Discharge planned for Friday.",
    tasks: {}
  },
  {
    id: "res-5",
    room: "112-A",
    name: "Taylor, Martha",
    codeStatus: "DNR",
    diet: "Soft / Nectar Thick",
    fluid: "Encourage Fluids",
    transfer: "1PA / Wheelchair",
    bowelBladder: "Brief M / BM Check",
    adlLevel: "Mod Assist",
    shower: "Today EVE",
    vitalsFreq: "BID (Vitals)",
    safety: "Wandering / Elopement",
    accuChek: "N/A",
    notes: "Dementia, sundowning. Reassure frequently.",
    tasks: {}
  },
  {
    id: "res-6",
    room: "114-B",
    name: "Gomez, Francisco",
    codeStatus: "FULL CODE",
    diet: "Regular / NAS",
    fluid: "Encourage Fluids",
    transfer: "1PA / Standby",
    bowelBladder: "Urinal / Standby",
    adlLevel: "Min Assist",
    shower: "Wed / Sat",
    vitalsFreq: "Q Shift",
    safety: "Left side weakness",
    accuChek: "AC & HS",
    notes: "Stroke rehab. Encourage L arm use during dressing.",
    tasks: {}
  },
  {
    id: "res-7",
    room: "120-A",
    name: "Smith, Catherine",
    codeStatus: "POLST/COLST",
    diet: "Regular",
    fluid: "Independent",
    transfer: "2PA / Pivot",
    bowelBladder: "Ostomy Bag",
    adlLevel: "Mod Assist",
    shower: "Today DAY",
    vitalsFreq: "Q Shift",
    safety: "Skin integrity / Heel protectors",
    accuChek: "N/A",
    notes: "Check Ostomy pouch Q Shift. Offload heels in bed.",
    tasks: {}
  },
  {
    id: "res-8",
    room: "122-B",
    name: "Baker, Harold",
    codeStatus: "FULL CODE",
    diet: "NPO (Pre-op)",
    fluid: "NPO - IV Fluids",
    transfer: "Bedrest",
    bowelBladder: "Foley Catheter",
    adlLevel: "Total Care",
    shower: "Bed Bath",
    vitalsFreq: "Q2H Vitals",
    safety: "Strict Bedrest",
    accuChek: "Q4H BS",
    notes: "NPO for procedure tomorrow morning. Oral care Q2H.",
    tasks: {}
  }
];

let residentsData = [];

// ============================================================
// AUTO-SHIFT DETECTION — Determines shift from system clock
// ============================================================
function detectShift() {
  const now = new Date();
  const time = now.getHours() + (now.getMinutes() / 60);

  if (time >= 6.0 && time < 14.5) return 'DAY (06:00 - 14:30)';
  if (time >= 14.0 && time < 22.5) return 'EVE (14:00 - 22:30)';
  return 'NOC (22:00 - 06:30)';
}

// ============================================================
// USER PROFILE — Sticky localStorage (type once, never again)
// ============================================================
const PROFILE_KEY = 'sante_cna_profile';
const SHIFT_KEY = 'sante_cna_shift';     // Full shift state
const RESIDENTS_KEY = 'sante_cna_residents';
const HISTORY_KEY = 'sante_cna_history';   // 14-day rolling shift history archive

function saveToHistory() {
  if (residentsData.length === 0) return;
  try {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const date = document.getElementById('shiftDate').value;
    const shift = document.getElementById('shiftType').value;
    const hall = document.getElementById('hallUnit').value;

    const record = {
      id: `shift-${date}-${shift}-${hall}`.replace(/\s+/g, '-'),
      date: date,
      shift: shift,
      hall: hall,
      cnaName: document.getElementById('cnaName').value,
      nurseName: document.getElementById('nurseName').value,
      facility: document.getElementById('facilityName').value,
      residentCount: residentsData.length,
      residents: JSON.parse(JSON.stringify(residentsData)),
      savedAt: new Date().toISOString()
    };

    // Filter out existing record with same composite ID (update it)
    history = history.filter(h => h.id !== record.id);
    // Unshift newest record to front
    history.unshift(record);
    // Keep max 14 shifts in history
    history = history.slice(0, 14);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('Could not save to shift history:', e);
  }
}

function loadUserProfile() {
  const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
  if (profile.facilityName) document.getElementById('facilityName').value = profile.facilityName;
  if (profile.hallUnit) document.getElementById('hallUnit').value = profile.hallUnit;
  if (profile.cnaName) document.getElementById('cnaName').value = profile.cnaName;
  if (profile.nurseName) document.getElementById('nurseName').value = profile.nurseName;
}

function saveUserProfile() {
  const profile = {
    facilityName: document.getElementById('facilityName').value,
    hallUnit: document.getElementById('hallUnit').value,
    cnaName: document.getElementById('cnaName').value,
    nurseName: document.getElementById('nurseName').value
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// Auto-save profile on any metadata field change
function setupProfileAutoSave() {
  const metaFields = ['facilityName', 'hallUnit', 'cnaName', 'nurseName'];
  metaFields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('change', saveUserProfile);
      el.addEventListener('blur', saveUserProfile);
    }
  });
}

// ============================================================
// COMPREHENSIVE AUTO-SAVE — All state, all the time
// ============================================================
let saveTimeout = null;

function saveData() {
  try {
    // Rolling backup: save last known-good state before overwriting
    const existingResidents = localStorage.getItem(RESIDENTS_KEY);
    if (existingResidents) {
      localStorage.setItem('sante_backup', existingResidents);
    }

    // Save residents
    localStorage.setItem(RESIDENTS_KEY, JSON.stringify(residentsData));

    // Save full shift metadata
    const shiftState = {
      metadata: {
        facility: document.getElementById('facilityName').value,
        date: document.getElementById('shiftDate').value,
        shift: document.getElementById('shiftType').value,
        hall: document.getElementById('hallUnit').value,
        cnaName: document.getElementById('cnaName').value,
        nurseName: document.getElementById('nurseName').value,
        lastUpdated: new Date().toISOString()
      },
      layoutMode: document.getElementById('layoutSelect').value,
      residentCount: residentsData.length
    };
    localStorage.setItem(SHIFT_KEY, JSON.stringify(shiftState));
    saveToHistory();
  } catch (e) {
    console.error('Save failed (storage may be full):', e);
    // Don't crash the app — data is still in memory
    // Show a subtle warning if quota is exceeded
    if (e.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded. Consider clearing old data.');
    }
  }
}

// Debounced auto-save for rapid edits
function debouncedSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveData, 300);
}

// ============================================================
// DATA LOADING — Empty by default, demo only on explicit click
// ============================================================
function loadData() {
  const saved = localStorage.getItem(RESIDENTS_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all residents have a tasks object (migration for old data)
      residentsData = parsed.map(r => ({
        ...r,
        tasks: r.tasks || {}
      }));
    } catch (e) {
      // Corrupted data — start empty, not with demo data
      residentsData = [];
    }
  } else {
    // PHASE 1 CHANGE: Start empty instead of loading demo data
    residentsData = [];
  }
}

function loadShiftMetadata() {
  const saved = localStorage.getItem(SHIFT_KEY);
  if (saved) {
    try {
      const shift = JSON.parse(saved);
      if (shift.metadata) {
        if (shift.metadata.date) document.getElementById('shiftDate').value = shift.metadata.date;
        if (shift.metadata.shift) document.getElementById('shiftType').value = shift.metadata.shift;
      }
      if (shift.layoutMode) document.getElementById('layoutSelect').value = shift.layoutMode;
    } catch (e) {
      // Ignore corrupted shift data
    }
  }
}

// ============================================================
// AUTO-LAYOUT — Picks the right grid based on resident count
// ============================================================
function autoSelectLayout() {
  const count = residentsData.length;
  const layoutSelect = document.getElementById('layoutSelect');

  if (count <= 1) {
    layoutSelect.value = '1-grid';
  } else if (count <= 4) {
    layoutSelect.value = '4-grid';
  } else if (count <= 8) {
    layoutSelect.value = '8-grid';
  } else {
    layoutSelect.value = '12-grid';
  }
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load stored resident data (empty if first time)
  loadData();

  // 2. Load user profile (sticky fields)
  loadUserProfile();

  // 3. Set today's date
  updateDateDefault();

  // 4. Auto-detect shift from system clock
  autoDetectShift();

  // 5. Restore shift metadata (if saved from previous session)
  loadShiftMetadata();

  // 5b. Check URL hash for shared shift state (#state=...)
  checkUrlForSharedState();

  // 6. Setup event listeners
  setupEventListeners();
  setupProfileAutoSave();
  setupMetadataAutoSave();

  // 7. Auto-select layout based on resident count
  autoSelectLayout();

  // 8. Render the grid
  renderGrid();

  // 9. Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

function autoDetectShift() {
  const shiftSelect = document.getElementById('shiftType');
  const savedShift = localStorage.getItem(SHIFT_KEY);

  // Only auto-detect if no saved shift data (fresh session)
  if (!savedShift) {
    const detected = detectShift();
    // Find the matching option
    for (let i = 0; i < shiftSelect.options.length; i++) {
      if (shiftSelect.options[i].value === detected) {
        shiftSelect.selectedIndex = i;
        break;
      }
    }
  }
}

// Set Today's Date
function updateDateDefault() {
  const dateInput = document.getElementById('shiftDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
}

// Auto-save metadata fields (date, shift, layout) on change
function setupMetadataAutoSave() {
  const metaFields = ['shiftDate', 'shiftType', 'layoutSelect'];
  metaFields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('change', debouncedSave);
    }
  });
}

// ============================================================
// RENDER GRID — With persistent checkbox support
// ============================================================
function renderGrid() {
  const gridContainer = document.getElementById('residentGrid');
  const layoutSelect = document.getElementById('layoutSelect');
  const layoutClass = `grid-${layoutSelect.value.split('-')[0]}`;

  gridContainer.className = `resident-grid ${layoutClass}`;
  gridContainer.innerHTML = '';

  if (residentsData.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.4;">📋</div>
        <h3 style="margin-bottom: 8px; color: var(--text-main);">Your Shift Sheet is Ready</h3>
        <p style="margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
          Add your assigned residents to get started, or load demo data to explore the app.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button onclick="document.getElementById('btnAddResident').click()" class="btn btn-primary" style="font-size: 1rem; padding: 12px 24px;">
            <i data-lucide="user-plus"></i> Add First Resident
          </button>
          <button onclick="document.getElementById('btnQuickDemo').click()" class="btn btn-secondary" style="font-size: 0.9rem; padding: 12px 20px;">
            <i data-lucide="sparkles"></i> Load Demo Data
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  residentsData.forEach((res, index) => {
    const card = document.createElement('div');
    card.className = 'res-card';

    const codeClass = res.codeStatus.includes('DNR') ? 'code-dnr' : 'code-full';

    // Build checkbox HTML with persistent state
    const taskDefs = [
      { key: 'vitals', label: 'Vit/Wt' },
      { key: 'meals', label: 'Meal %' },
      { key: 'bm', label: 'BM' },
      { key: 'turn', label: 'Turn Q2H' },
      { key: 'shower', label: 'Shower' }
    ];

    const tasks = res.tasks || {};
    const checkboxesHtml = taskDefs.map(t => {
      const taskState = tasks[t.key];
      const isChecked = taskState && taskState.completed ? 'checked' : '';
      const timestamp = taskState && taskState.timestamp
        ? `title="Completed: ${new Date(taskState.timestamp).toLocaleTimeString()}"`
        : '';
      return `<label class="check-label ${isChecked ? 'task-done' : ''}" ${timestamp}>
        <input type="checkbox" ${isChecked}
          onchange="handleCheckboxClick('${res.id}', '${t.key}', this.checked)">
        ${escapeHtml(t.label)}
      </label>`;
    }).join('');

    card.innerHTML = `
      <div class="res-header">
        <input type="checkbox" class="no-print" ${selectedResidentIds.has(res.id) ? 'checked' : ''} onchange="toggleSelectResident('${res.id}', this.checked)" title="Select resident for batch actions" style="cursor: pointer; accent-color: var(--primary); margin-right: 4px;">
        <span class="res-room-badge">${escapeHtml(res.room || 'Rm')}</span>
        <span class="res-name">${escapeHtml(res.name || 'Resident Name')}</span>
        <span class="res-code-badge ${codeClass}">${escapeHtml(res.codeStatus || 'CODE')}</span>
      </div>

      <div class="res-section">
        <div class="res-field">
          <span class="res-label">DIET / FLUID:</span>
          <span class="res-val">${escapeHtml(res.diet || 'Regular')} | ${escapeHtml(res.fluid || 'Independent')}</span>
        </div>
        <div class="res-field">
          <span class="res-label">MOBILITY / ASSIST:</span>
          <span class="res-val">${escapeHtml(res.transfer || 'Independent')}</span>
        </div>
        <div class="res-field">
          <span class="res-label">BOWEL / BLADDER:</span>
          <span class="res-val">${escapeHtml(res.bowelBladder || 'Independent')}</span>
        </div>
        <div class="res-field">
          <span class="res-label">SHOWER / ADL:</span>
          <span class="res-val">${escapeHtml(res.shower || 'None')} (${escapeHtml(res.adlLevel || 'Assist')})</span>
        </div>
        <div class="res-field">
          <span class="res-label">VITALS / ACCU-CHEK:</span>
          <span class="res-val">${escapeHtml(res.vitalsFreq || 'Q Shift')} | ${escapeHtml(res.accuChek || 'N/A')}</span>
        </div>
        <div class="res-field">
          <span class="res-label">SAFETY / PRECAUTIONS:</span>
          <span class="res-val">${escapeHtml(res.safety || 'Standard')}</span>
        </div>
      </div>

      <div class="res-field" style="grid-column: 1 / -1;">
        <span class="res-label">SHIFT NOTES / FOCUS:</span>
        <span class="res-val" style="font-size: 0.75rem; font-style: italic;">${escapeHtml(res.notes || 'No special notes')}</span>
      </div>

      <!-- Quick Shift Checklist Trackers (PERSISTENT) -->
      <div class="res-checkboxes">
        ${checkboxesHtml}
      </div>

      <div class="res-actions no-print">
        <button class="btn-icon btn-edit" onclick="editResident('${res.id}')" title="Edit Resident">
          <i data-lucide="edit-3"></i>
        </button>
        <button class="btn-icon btn-clone" onclick="cloneResident('${res.id}')" title="Duplicate Resident">
          <i data-lucide="copy"></i>
        </button>
        <button class="btn-icon btn-delete" onclick="deleteResident('${res.id}')" title="Delete Resident">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    // Touch Swipe Gesture Handling (Mobile Quick Tasks)
    let touchStartX = 0;
    let touchStartY = 0;
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Horizontal swipe (diffX > 50px, diffY < 40px)
      if (Math.abs(diffX) > 50 && Math.abs(diffY) < 40) {
        const tasks = res.tasks || {};
        if (diffX > 0) {
          // Swipe Right -> toggle Vitals task
          const currentVal = tasks.vitals && tasks.vitals.completed;
          handleCheckboxClick(res.id, 'vitals', !currentVal);
          renderGrid();
        } else {
          // Swipe Left -> toggle Shower task
          const currentVal = tasks.shower && tasks.shower.completed;
          handleCheckboxClick(res.id, 'shower', !currentVal);
          renderGrid();
        }
      }
    }, { passive: true });

    gridContainer.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ============================================================
// PERSISTENT CHECKBOX HANDLING — Saves with timestamps
// ============================================================
window.handleCheckboxClick = function(resId, taskName, isChecked) {
  const res = residentsData.find(r => r.id === resId);
  if (!res) return;

  if (!res.tasks) res.tasks = {};

  res.tasks[taskName] = {
    completed: isChecked,
    timestamp: isChecked ? new Date().toISOString() : null
  };

  // Update the label styling without full re-render
  saveData();
};

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEventListeners() {
  document.getElementById('layoutSelect').addEventListener('change', renderGrid);

  document.getElementById('btnPrintBW').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btnQuickDemo').addEventListener('click', () => {
    residentsData = sampleResidents.map(r => ({ ...r, tasks: {} }));
    autoSelectLayout();
    saveData();
    renderGrid();
  });

  document.getElementById('btnClearAll').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all resident data for this shift?')) {
      residentsData = [];
      autoSelectLayout();
      saveData();
      renderGrid();
    }
  });

  document.getElementById('btnAddResident').addEventListener('click', () => {
    openModal();
  });

  document.getElementById('btnCloseModal').addEventListener('click', closeModal);
  document.getElementById('btnCancelModal').addEventListener('click', closeModal);

  document.getElementById('residentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveModalData();
  });

  // Export JSON for Cloud / File Backup
  document.getElementById('btnExportJSON').addEventListener('click', () => {
    const exportData = {
      schemaVersion: '1.1',
      facility: document.getElementById('facilityName').value,
      date: document.getElementById('shiftDate').value,
      shift: document.getElementById('shiftType').value,
      hall: document.getElementById('hallUnit').value,
      cna: document.getElementById('cnaName').value,
      nurse: document.getElementById('nurseName').value,
      exportedAt: new Date().toISOString(),
      residents: residentsData
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SANTE_CNA_Report_${exportData.date || 'Shift'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import JSON or CSV
  document.getElementById('btnImportJSON').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });

  document.getElementById('importFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileImport(file);
  });

  // Drag & Drop File Import
  document.body.addEventListener('dragover', (e) => e.preventDefault());
  document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileImport(e.dataTransfer.files[0]);
    }
  });

  // Shift Memory & History Listeners (Phase 3)
  const btnNewShift = document.getElementById('btnNewShift');
  if (btnNewShift) btnNewShift.addEventListener('click', openNewShiftModal);

  const btnShiftHistory = document.getElementById('btnShiftHistory');
  if (btnShiftHistory) btnShiftHistory.addEventListener('click', openHistoryModal);

  const btnCloseNewShiftModal = document.getElementById('btnCloseNewShiftModal');
  if (btnCloseNewShiftModal) btnCloseNewShiftModal.addEventListener('click', closeNewShiftModal);

  const btnCloseHistoryModal = document.getElementById('btnCloseHistoryModal');
  if (btnCloseHistoryModal) btnCloseHistoryModal.addEventListener('click', closeHistoryModal);

  const btnCarryForward = document.getElementById('btnCarryForward');
  if (btnCarryForward) btnCarryForward.addEventListener('click', carryForwardShift);

  const btnPickHistory = document.getElementById('btnPickHistory');
  if (btnPickHistory) btnPickHistory.addEventListener('click', () => {
    closeNewShiftModal();
    openHistoryModal();
  });

  const btnStartBlank = document.getElementById('btnStartBlank');
  if (btnStartBlank) btnStartBlank.addEventListener('click', () => {
    if (confirm('Start fresh with a blank shift sheet?')) {
      residentsData = [];
      document.getElementById('shiftDate').value = new Date().toISOString().split('T')[0];
      autoDetectShift();
      autoSelectLayout();
      saveData();
      renderGrid();
      closeNewShiftModal();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+N / Cmd+N for new resident
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      openModal();
    }
    // Escape to close modals
    if (e.key === 'Escape') {
      closeModal();
      closeNewShiftModal();
      closeHistoryModal();
      closeSmartPasteModal();
      closeShareModal();
      closeEhrModal();
    }
  });

  // Smart Paste & Room Generator Listeners (Phase 4)
  const btnSmartPaste = document.getElementById('btnSmartPaste');
  if (btnSmartPaste) btnSmartPaste.addEventListener('click', openSmartPasteModal);

  const btnCloseSmartPasteModal = document.getElementById('btnCloseSmartPasteModal');
  if (btnCloseSmartPasteModal) btnCloseSmartPasteModal.addEventListener('click', closeSmartPasteModal);

  const btnParsePasteText = document.getElementById('btnParsePasteText');
  if (btnParsePasteText) btnParsePasteText.addEventListener('click', parseSmartPasteText);

  const btnGenerateRange = document.getElementById('btnGenerateRange');
  if (btnGenerateRange) btnGenerateRange.addEventListener('click', generateRoomRange);

  // Multi-Device & Peer Sharing / EHR Listeners (Phase 5)
  const btnShareSheet = document.getElementById('btnShareSheet');
  if (btnShareSheet) btnShareSheet.addEventListener('click', openShareModal);

  const btnCloseShareModal = document.getElementById('btnCloseShareModal');
  if (btnCloseShareModal) btnCloseShareModal.addEventListener('click', closeShareModal);

  const btnCopyShareLink = document.getElementById('btnCopyShareLink');
  if (btnCopyShareLink) btnCopyShareLink.addEventListener('click', copyShareLink);

  const btnCopyEhr = document.getElementById('btnCopyEhr');
  if (btnCopyEhr) btnCopyEhr.addEventListener('click', openEhrModal);

  const btnCloseEhrModal = document.getElementById('btnCloseEhrModal');
  if (btnCloseEhrModal) btnCloseEhrModal.addEventListener('click', closeEhrModal);

  const btnCopyEhrText = document.getElementById('btnCopyEhrText');
  if (btnCopyEhrText) btnCopyEhrText.addEventListener('click', copyEhrText);

  // FAB Mobile Listener (Phase 6)
  const fabMainBtn = document.getElementById('fabMainBtn');
  if (fabMainBtn) fabMainBtn.addEventListener('click', toggleFabMenu);
}

window.toggleFabMenu = function() {
  const menu = document.getElementById('fabMenu');
  const btn = document.getElementById('fabMainBtn');
  if (!menu || !btn) return;

  menu.classList.toggle('active');
  btn.classList.toggle('active');
};

// ============================================================
// SHIFT MEMORY & CARRY FORWARD (Phase 3)
// ============================================================
function carryForwardShift() {
  if (residentsData.length === 0) {
    alert('No residents to copy forward. Add residents first or start fresh!');
    return;
  }

  // Reset task checkboxes and timestamps for the new shift
  residentsData = residentsData.map(res => ({
    ...res,
    tasks: {}
  }));

  // Auto-update shift date to today and auto-detect current shift
  document.getElementById('shiftDate').value = new Date().toISOString().split('T')[0];
  const detected = detectShift();
  const shiftSelect = document.getElementById('shiftType');
  for (let i = 0; i < shiftSelect.options.length; i++) {
    if (shiftSelect.options[i].value === detected) {
      shiftSelect.selectedIndex = i;
      break;
    }
  }

  autoSelectLayout();
  saveData();
  renderGrid();
  closeNewShiftModal();
}

function renderHistoryList() {
  const container = document.getElementById('historyListContainer');
  if (!container) return;

  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  if (history.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--text-muted);">
        <p>No past shift history saved yet.</p>
        <p style="font-size: 0.8rem; margin-top: 4px;">As you complete shifts, they will be automatically archived here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = history.map(item => `
    <div style="background: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
      <div>
        <div style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">
          ${escapeHtml(item.date)} — ${escapeHtml(item.shift)}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
          ${escapeHtml(item.hall || 'Unit')} | CNA: ${escapeHtml(item.cnaName || 'N/A')} | ${item.residentCount} Residents
        </div>
      </div>
      <button class="btn btn-secondary" onclick="restoreShiftFromHistory('${item.id}')" style="font-size: 0.8rem; padding: 6px 12px;">
        <i data-lucide="rotate-ccw"></i> Restore
      </button>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.restoreShiftFromHistory = function(shiftId) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const record = history.find(h => h.id === shiftId);
  if (!record) return;

  // Restore residents and reset checkboxes for new shift
  residentsData = (record.residents || []).map(r => ({ ...r, tasks: {} }));

  if (record.facility) document.getElementById('facilityName').value = record.facility;
  if (record.hall) document.getElementById('hallUnit').value = record.hall;

  // Set today's date & auto-detect current shift
  document.getElementById('shiftDate').value = new Date().toISOString().split('T')[0];
  const detected = detectShift();
  const shiftSelect = document.getElementById('shiftType');
  for (let i = 0; i < shiftSelect.options.length; i++) {
    if (shiftSelect.options[i].value === detected) {
      shiftSelect.selectedIndex = i;
      break;
    }
  }

  autoSelectLayout();
  saveData();
  renderGrid();
  closeHistoryModal();
  closeNewShiftModal();
};

function openNewShiftModal() {
  document.getElementById('newShiftModal').classList.add('active');
}
function closeNewShiftModal() {
  document.getElementById('newShiftModal').classList.remove('active');
}
function openHistoryModal() {
  renderHistoryList();
  document.getElementById('historyModal').classList.add('active');
}
function closeHistoryModal() {
  document.getElementById('historyModal').classList.remove('active');
}

// ============================================================
// MODAL FUNCTIONS
// ============================================================
function openModal(resId = null) {
  const modal = document.getElementById('residentModal');
  const title = document.getElementById('modalTitle');

  if (resId) {
    const res = residentsData.find(r => r.id === resId);
    if (res) {
      title.innerText = "Edit Resident Details";
      document.getElementById('modalResidentId').value = res.id;
      document.getElementById('mRoom').value = res.room || '';
      document.getElementById('mName').value = res.name || '';
      document.getElementById('mCodeStatus').value = res.codeStatus || 'FULL CODE';
      document.getElementById('mDiet').value = res.diet || '';
      document.getElementById('mFluid').value = res.fluid || '';
      document.getElementById('mTransfer').value = res.transfer || 'Independent';
      document.getElementById('mBowelBladder').value = res.bowelBladder || '';
      document.getElementById('mAdlLevel').value = res.adlLevel || '';
      document.getElementById('mShower').value = res.shower || '';
      document.getElementById('mVitalsFreq').value = res.vitalsFreq || '';
      document.getElementById('mSafety').value = res.safety || '';
      document.getElementById('mAccuChek').value = res.accuChek || '';
      document.getElementById('mNotes').value = res.notes || '';
    }
  } else {
    title.innerText = "Add New Resident";
    document.getElementById('residentForm').reset();
    document.getElementById('modalResidentId').value = '';
  }

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('residentModal').classList.remove('active');
}

function saveModalData() {
  const resId = document.getElementById('modalResidentId').value;

  const resObj = {
    id: resId || `res-${Date.now()}`,
    room: document.getElementById('mRoom').value,
    name: document.getElementById('mName').value,
    codeStatus: document.getElementById('mCodeStatus').value,
    diet: document.getElementById('mDiet').value,
    fluid: document.getElementById('mFluid').value,
    transfer: document.getElementById('mTransfer').value,
    bowelBladder: document.getElementById('mBowelBladder').value,
    adlLevel: document.getElementById('mAdlLevel').value,
    shower: document.getElementById('mShower').value,
    vitalsFreq: document.getElementById('mVitalsFreq').value,
    safety: document.getElementById('mSafety').value,
    accuChek: document.getElementById('mAccuChek').value,
    notes: document.getElementById('mNotes').value,
    tasks: {} // Initialize empty tasks for new residents
  };

  if (resId) {
    const idx = residentsData.findIndex(r => r.id === resId);
    if (idx !== -1) {
      // Preserve existing task states when editing
      resObj.tasks = residentsData[idx].tasks || {};
      residentsData[idx] = resObj;
    }
  } else {
    residentsData.push(resObj);
  }

  autoSelectLayout();
  saveData();
  renderGrid();
  closeModal();
}

window.cloneResident = function(id) {
  const original = residentsData.find(r => r.id === id);
  if (!original) return;

  const clone = {
    ...original,
    id: `res-${Date.now()}`,
    room: '',    // Leave blank for quick editing
    name: original.name ? `${original.name} (Copy)` : '',
    tasks: {}    // Fresh task checklist
  };

  residentsData.push(clone);
  autoSelectLayout();
  saveData();
  renderGrid();
  openModal(clone.id); // Instantly open for editing room/name
};

window.applyPreset = function(type) {
  if (type === 'independent') {
    document.getElementById('mCodeStatus').value = 'FULL CODE';
    document.getElementById('mDiet').value = 'Regular / Thin Liq';
    document.getElementById('mFluid').value = 'Independent';
    document.getElementById('mTransfer').value = 'Independent';
    document.getElementById('mBowelBladder').value = 'Independent';
    document.getElementById('mAdlLevel').value = 'Setup Assist';
    document.getElementById('mShower').value = 'Mon / Thu NOC';
    document.getElementById('mVitalsFreq').value = 'Q Shift';
    document.getElementById('mSafety').value = 'Self-Transfer';
    document.getElementById('mAccuChek').value = 'N/A';
  } else if (type === 'standby') {
    document.getElementById('mCodeStatus').value = 'FULL CODE';
    document.getElementById('mDiet').value = 'Mechanical Soft';
    document.getElementById('mFluid').value = 'Encourage Fluids';
    document.getElementById('mTransfer').value = 'Supervision / Standby';
    document.getElementById('mBowelBladder').value = 'Urinal / Standby';
    document.getElementById('mAdlLevel').value = 'Min Assist';
    document.getElementById('mShower').value = 'Wed / Sat';
    document.getElementById('mVitalsFreq').value = 'Q Shift';
    document.getElementById('mSafety').value = 'Left side weakness';
    document.getElementById('mAccuChek').value = 'AC & HS';
  } else if (type === 'total') {
    document.getElementById('mCodeStatus').value = 'DNR';
    document.getElementById('mDiet').value = 'Puree / Honey Thick';
    document.getElementById('mFluid').value = 'Feed Assist';
    document.getElementById('mTransfer').value = 'Hoyer / Full Lift';
    document.getElementById('mBowelBladder').value = 'Incontinent / Brief XL';
    document.getElementById('mAdlLevel').value = 'Total Care';
    document.getElementById('mShower').value = 'Bed Bath Today';
    document.getElementById('mVitalsFreq').value = 'Q Shift';
    document.getElementById('mSafety').value = 'Bed Low / Mat';
    document.getElementById('mAccuChek').value = 'N/A';
    document.getElementById('mNotes').value = 'Aspiration risk. Sit 90° for meals & 30 min after. Reposition Q2H.';
  }
};

window.editResident = function(id) {
  openModal(id);
};

window.deleteResident = function(id) {
  if (confirm('Delete this resident from the shift report?')) {
    residentsData = residentsData.filter(r => r.id !== id);
    autoSelectLayout();
    saveData();
    renderGrid();
  }
};

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ============================================================
// BATCH OPERATIONS & SMART PASTE (Phase 4)
// ============================================================
let selectedResidentIds = new Set();

window.toggleSelectResident = function(id, isSelected) {
  if (isSelected) {
    selectedResidentIds.add(id);
  } else {
    selectedResidentIds.delete(id);
  }
  updateBatchBarUI();
};

function updateBatchBarUI() {
  const bar = document.getElementById('batchActionsBar');
  const countEl = document.getElementById('batchSelectedCount');
  if (!bar || !countEl) return;

  if (selectedResidentIds.size > 0) {
    bar.style.display = 'flex';
    countEl.innerText = `${selectedResidentIds.size} selected`;
  } else {
    bar.style.display = 'none';
  }
}

window.clearBatchSelection = function() {
  selectedResidentIds.clear();
  updateBatchBarUI();
  renderGrid();
};

window.applyBatchEdit = function(fieldName, newValue) {
  if (selectedResidentIds.size === 0) return;

  residentsData = residentsData.map(res => {
    if (selectedResidentIds.has(res.id)) {
      return { ...res, [fieldName]: newValue };
    }
    return res;
  });

  saveData();
  renderGrid();
};

window.deleteSelectedResidents = function() {
  if (selectedResidentIds.size === 0) return;

  if (confirm(`Delete ${selectedResidentIds.size} selected residents?`)) {
    residentsData = residentsData.filter(r => !selectedResidentIds.has(r.id));
    selectedResidentIds.clear();
    updateBatchBarUI();
    autoSelectLayout();
    saveData();
    renderGrid();
  }
};

// Smart Paste Textarea Parser
function parseSmartPasteText() {
  const textarea = document.getElementById('smartPasteTextarea');
  if (!textarea || !textarea.value.trim()) {
    alert('Please paste some assignment text first!');
    return;
  }

  const lines = textarea.value.split('\n').map(l => l.trim()).filter(Boolean);
  let addedCount = 0;

  lines.forEach((line, index) => {
    // Regex for room pattern (e.g., 104, 104-A, 104A, Rm 104)
    const roomMatch = line.match(/\b(?:Rm\s*)?(\d{3}[-–]?[A-Z]?)\b/i);
    const room = roomMatch ? roomMatch[1] : `Rm-${index + 1}`;

    // Code status match
    let codeStatus = 'FULL CODE';
    if (/DNR\/DNI/i.test(line)) codeStatus = 'DNR/DNI';
    else if (/POLST|COLST/i.test(line)) codeStatus = 'POLST/COLST';
    else if (/DNR/i.test(line)) codeStatus = 'DNR';

    // Clean text to find name
    let cleanLine = line
      .replace(/\b(?:Rm\s*)?\d{3}[-–]?[A-Z]?\b/gi, '')
      .replace(/FULL CODE|DNR\/DNI|POLST\/COLST|DNR/gi, '')
      .trim();

    const name = cleanLine || `Resident ${room}`;

    residentsData.push({
      id: `res-${Date.now()}-${index}`,
      room: room,
      name: name,
      codeStatus: codeStatus,
      diet: 'Regular',
      fluid: 'Independent',
      transfer: 'Independent',
      bowelBladder: 'Independent',
      adlLevel: 'Assist',
      shower: 'None',
      vitalsFreq: 'Q Shift',
      safety: 'Standard',
      accuChek: 'N/A',
      notes: 'Imported via Smart Paste',
      tasks: {}
    });

    addedCount++;
  });

  textarea.value = '';
  autoSelectLayout();
  saveData();
  renderGrid();
  closeSmartPasteModal();
  alert(`Successfully parsed and added ${addedCount} residents!`);
}

// Generate Room Range
function generateRoomRange() {
  const startRoom = parseInt(document.getElementById('rangeStartRoom').value, 10) || 101;
  const count = parseInt(document.getElementById('rangeCount').value, 10) || 8;
  const suffix = document.getElementById('rangeSuffix').value;

  let roomNumber = startRoom;

  for (let i = 0; i < count; i++) {
    let roomLabel = '';
    if (suffix === 'AB') {
      const isB = (i % 2 === 1);
      roomLabel = `${roomNumber}-${isB ? 'B' : 'A'}`;
      if (isB) roomNumber++;
    } else {
      roomLabel = `${roomNumber}`;
      roomNumber++;
    }

    residentsData.push({
      id: `res-${Date.now()}-${i}`,
      room: roomLabel,
      name: '',    // Blank for quick filling inline/modal
      codeStatus: 'FULL CODE',
      diet: 'Regular',
      fluid: 'Independent',
      transfer: 'Independent',
      bowelBladder: 'Independent',
      adlLevel: 'Assist',
      shower: 'None',
      vitalsFreq: 'Q Shift',
      safety: 'Standard',
      accuChek: 'N/A',
      notes: '',
      tasks: {}
    });
  }

  autoSelectLayout();
  saveData();
  renderGrid();
  closeSmartPasteModal();
}

function openSmartPasteModal() {
  document.getElementById('smartPasteModal').classList.add('active');
}
function closeSmartPasteModal() {
  document.getElementById('smartPasteModal').classList.remove('active');
}

// ============================================================
// MULTI-DEVICE, PEER SHARING & EHR EXPORT (Phase 5)
// ============================================================

// Check URL Hash for Shared State (#state=...)
function checkUrlForSharedState() {
  const hash = window.location.hash;
  if (!hash || !hash.includes('state=')) return;

  try {
    const rawState = hash.split('state=')[1];
    if (!rawState) return;

    const decoded = decodeURIComponent(escape(atob(rawState)));
    const payload = JSON.parse(decoded);

    if (payload.residents && Array.isArray(payload.residents)) {
      residentsData = payload.residents.map(r => ({ ...r, tasks: r.tasks || {} }));

      if (payload.facility) document.getElementById('facilityName').value = payload.facility;
      if (payload.date) document.getElementById('shiftDate').value = payload.date;
      if (payload.shift) document.getElementById('shiftType').value = payload.shift;
      if (payload.hall) document.getElementById('hallUnit').value = payload.hall;
      if (payload.cna) document.getElementById('cnaName').value = payload.cna;
      if (payload.nurse) document.getElementById('nurseName').value = payload.nurse;

      saveData();
      // Clean URL hash without reload
      history.replaceState(null, '', window.location.pathname);
      alert(`🎉 Received shift sheet with ${residentsData.length} residents from shared link!`);
    }
  } catch (err) {
    console.error('Error parsing shared URL state:', err);
  }
}

// Generate Compressed Shareable URL
function serializeShiftUrl() {
  const payload = {
    v: '1.1',
    facility: document.getElementById('facilityName').value,
    date: document.getElementById('shiftDate').value,
    shift: document.getElementById('shiftType').value,
    hall: document.getElementById('hallUnit').value,
    cna: document.getElementById('cnaName').value,
    nurse: document.getElementById('nurseName').value,
    residents: residentsData
  };

  const jsonStr = JSON.stringify(payload);
  const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
  return `${window.location.origin}${window.location.pathname}#state=${base64}`;
}

// Share Modal Controls
function openShareModal() {
  if (residentsData.length === 0) {
    alert('Add residents to your shift sheet before sharing!');
    return;
  }

  const shareUrl = serializeShiftUrl();
  renderQrCode(shareUrl);
  document.getElementById('shareModal').classList.add('active');
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('active');
}

function copyShareLink() {
  const shareUrl = serializeShiftUrl();
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('🎉 Share link copied to clipboard! You can send it via message or email.');
  }).catch(() => {
    prompt('Copy this share link:', shareUrl);
  });
}

// SVG QR Code Generator
function renderQrCode(url) {
  const canvasContainer = document.getElementById('qrCanvas');
  if (!canvasContainer) return;

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff`;

  canvasContainer.innerHTML = `
    <img src="${qrApiUrl}" alt="Shift QR Code" style="width: 220px; height: 220px; display: block; border-radius: 4px;" />
  `;
}

// Copy for EHR Charting Summary
function generateEhrSummary() {
  const facility = document.getElementById('facilityName').value || 'Santé';
  const date = document.getElementById('shiftDate').value || new Date().toISOString().split('T')[0];
  const shift = document.getElementById('shiftType').value || 'Shift';
  const hall = document.getElementById('hallUnit').value || 'Unit';
  const cna = document.getElementById('cnaName').value || 'CNA';

  let summary = `=================================================\n`;
  summary += `CNA SHIFT SUMMARY REPORT — ${facility}\n`;
  summary += `DATE: ${date} | SHIFT: ${shift} | HALL/UNIT: ${hall}\n`;
  summary += `CNA: ${cna} | RESIDENTS COUNT: ${residentsData.length}\n`;
  summary += `=================================================\n\n`;

  residentsData.forEach((res, i) => {
    summary += `[${i + 1}] ROOM ${res.room || 'N/A'} — ${res.name || 'Resident'} (${res.codeStatus || 'FULL CODE'})\n`;
    summary += `    DIET/FLUID: ${res.diet || 'Regular'} | ${res.fluid || 'Independent'}\n`;
    summary += `    MOBILITY: ${res.transfer || 'Independent'} | CONTINENCE: ${res.bowelBladder || 'Independent'}\n`;
    summary += `    SHOWER/ADL: ${res.shower || 'None'} (${res.adlLevel || 'Assist'})\n`;
    summary += `    VITALS/BG: ${res.vitalsFreq || 'Q Shift'} | Accu-Chek: ${res.accuChek || 'N/A'}\n`;
    summary += `    SAFETY: ${res.safety || 'Standard'}\n`;

    const tasks = res.tasks || {};
    const taskStatus = Object.keys(tasks).map(k => `${k.toUpperCase()}: ${tasks[k].completed ? 'DONE' : 'PENDING'}`).join(', ');
    if (taskStatus) summary += `    TASKS: ${taskStatus}\n`;

    if (res.notes) summary += `    NOTES: ${res.notes}\n`;
    summary += `-------------------------------------------------\n`;
  });

  return summary;
}

function openEhrModal() {
  if (residentsData.length === 0) {
    alert('Add residents to your shift sheet first!');
    return;
  }

  const text = generateEhrSummary();
  document.getElementById('ehrTextarea').value = text;
  document.getElementById('ehrModal').classList.add('active');
}

function closeEhrModal() {
  document.getElementById('ehrModal').classList.remove('active');
}

function copyEhrText() {
  const textarea = document.getElementById('ehrTextarea');
  if (!textarea) return;

  textarea.select();
  navigator.clipboard.writeText(textarea.value).then(() => {
    alert('📋 Shift summary copied to clipboard! Ready to paste into PointClickCare / EHR charting.');
  }).catch(() => {
    alert('Text selected — press Ctrl+C or Cmd+C to copy.');
  });
}

// Universal File Import Handler (JSON & CSV Support)
function handleFileImport(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    if (file.name.endsWith('.csv')) {
      parseCsvInput(text);
    } else {
      try {
        const imported = JSON.parse(text);
        if (imported.residents && Array.isArray(imported.residents)) {
          residentsData = imported.residents.map(r => ({ ...r, tasks: r.tasks || {} }));
          if (imported.facility) document.getElementById('facilityName').value = imported.facility;
          if (imported.date) document.getElementById('shiftDate').value = imported.date;
          if (imported.shift) document.getElementById('shiftType').value = imported.shift;
          if (imported.hall) document.getElementById('hallUnit').value = imported.hall;
          if (imported.cna) document.getElementById('cnaName').value = imported.cna;
          if (imported.nurse) document.getElementById('nurseName').value = imported.nurse;
          autoSelectLayout();
          saveData();
          saveUserProfile();
          renderGrid();
          alert('Shift report loaded successfully from JSON!');
        } else {
          alert('Invalid JSON structure.');
        }
      } catch (err) {
        alert('Error reading JSON file.');
      }
    }
  };
  reader.readAsText(file);
}

// CSV Parser
function parseCsvInput(csvText) {
  const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    alert('CSV file is empty or missing data rows.');
    return;
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const roomIdx = headers.findIndex(h => h.includes('room'));
  const nameIdx = headers.findIndex(h => h.includes('name'));
  const codeIdx = headers.findIndex(h => h.includes('code'));
  const dietIdx = headers.findIndex(h => h.includes('diet'));
  const transferIdx = headers.findIndex(h => h.includes('transfer') || h.includes('mobility'));

  let added = 0;
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
    if (cols.length === 0 || !cols[0]) continue;

    const room = roomIdx !== -1 ? cols[roomIdx] : cols[0];
    const name = nameIdx !== -1 ? cols[nameIdx] : (cols[1] || `Resident ${room}`);
    const code = codeIdx !== -1 ? cols[codeIdx] : 'FULL CODE';
    const diet = dietIdx !== -1 ? cols[dietIdx] : 'Regular';
    const transfer = transferIdx !== -1 ? cols[transferIdx] : 'Independent';

    residentsData.push({
      id: `res-${Date.now()}-${i}`,
      room: room,
      name: name,
      codeStatus: code.toUpperCase().includes('DNR') ? 'DNR' : 'FULL CODE',
      diet: diet,
      fluid: 'Independent',
      transfer: transfer,
      bowelBladder: 'Independent',
      adlLevel: 'Assist',
      shower: 'None',
      vitalsFreq: 'Q Shift',
      safety: 'Standard',
      accuChek: 'N/A',
      notes: 'Imported from CSV',
      tasks: {}
    });
    added++;
  }

  autoSelectLayout();
  saveData();
  renderGrid();
  alert(`Successfully imported ${added} residents from CSV file!`);
}
