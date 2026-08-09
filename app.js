// SANTÉ OF MESA - CNA MASTER REPORT SHEET LOGIC

// Default Initial Demo Residents (Tailored for Post-Acute Rehab & Skilled Nursing)
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
    notes: "Right hip post-op. Prefers walker. Reposition Q2H."
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
    notes: "CHF history. Record strict I&O. Empty Foley Q Shift."
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
    notes: "Aspiration risk. Sit 90° for meals & 30 min after."
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
    notes: "PT/OT at 10:00. Discharge planned for Friday."
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
    notes: "Dementia, sundowning. Reassure frequently."
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
    notes: "Stroke rehab. Encourage L arm use during dressing."
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
    notes: "Check Ostomy pouch Q Shift. Offload heels in bed."
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
    notes: "NPO for procedure tomorrow morning. Oral care Q2H."
  }
];

let residentsData = [];

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  renderGrid();
  updateDateDefault();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Load stored data or default
function loadData() {
  const saved = localStorage.getItem('sante_cna_residents');
  if (saved) {
    try {
      residentsData = JSON.parse(saved);
    } catch (e) {
      residentsData = [...sampleResidents];
    }
  } else {
    residentsData = [...sampleResidents];
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('sante_cna_residents', JSON.stringify(residentsData));
}

// Set Today's Date
function updateDateDefault() {
  const dateInput = document.getElementById('shiftDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
}

// Render Residents into Grid Layout
function renderGrid() {
  const gridContainer = document.getElementById('residentGrid');
  const layoutSelect = document.getElementById('layoutSelect');
  const layoutValue = layoutSelect.value;
  const layoutClass = `grid-${layoutValue}`;
  
  gridContainer.className = `resident-grid ${layoutClass}`;
  gridContainer.innerHTML = '';

  if (residentsData.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <h3>No Residents Added Yet</h3>
        <p>Click "Add Resident" or "Demo Data" to populate your shift report sheet.</p>
      </div>
    `;
    return;
  }

  residentsData.forEach((res, index) => {
    const card = document.createElement('div');
    const isDNR = (res.codeStatus || '').toUpperCase().includes('DNR');
    const isFall = (res.safety || '').toLowerCase().includes('fall');
    
    card.className = `res-card quick-card ${isDNR ? 'card-dnr' : ''} ${isFall ? 'card-fall' : ''}`;
    const codeClass = isDNR ? 'code-dnr' : 'code-full';

    card.innerHTML = `
      <div class="res-header">
        <span class="res-room-badge">${escapeHtml(res.room || 'Rm')}</span>
        <span class="res-name">${escapeHtml(res.name || 'Resident Name')}</span>
        <span class="res-code-badge ${codeClass}">${escapeHtml(res.codeStatus || 'CODE')}</span>
      </div>

      <!-- Quick Action Badges (Instant Glance) -->
      <div class="quick-badge-row">
        <span class="speed-badge badge-transfer" title="Mobility & Transfer"><i data-lucide="activity"></i> ${escapeHtml(res.transfer || 'Indep')}</span>
        <span class="speed-badge badge-diet" title="Diet & Texture"><i data-lucide="utensils"></i> ${escapeHtml(res.diet || 'Regular')}</span>
        <span class="speed-badge badge-bowel" title="Elimination"><i data-lucide="shield"></i> ${escapeHtml(res.bowelBladder || 'Indep')}</span>
        <span class="speed-badge badge-shower" title="Shower Schedule"><i data-lucide="droplet"></i> ${escapeHtml(res.shower || 'No Shwr')}</span>
      </div>

      <div class="res-section" style="margin-top: 6px;">
        <div class="res-field">
          <span class="res-label">FLUID / I&O:</span>
          <span class="res-val">${escapeHtml(res.fluid || 'Independent')}</span>
        </div>
        <div class="res-field">
          <span class="res-label">VITALS & ACCU-CHEK:</span>
          <span class="res-val">${escapeHtml(res.vitalsFreq || 'Q Shift')} | ${escapeHtml(res.accuChek || 'N/A')}</span>
        </div>
        <div class="res-field" style="grid-column: 1 / -1;">
          <span class="res-label">SAFETY & PRECAUTIONS:</span>
          <span class="res-val" style="color: ${isFall ? 'var(--accent-gold)' : 'inherit'}; font-weight: 700;">${escapeHtml(res.safety || 'Standard Precautions')}</span>
        </div>
      </div>

      <div class="res-field" style="grid-column: 1 / -1; margin-top: 2px;">
        <span class="res-label">FOCUS & HANDOFF NOTES:</span>
        <span class="res-val" style="font-size: 0.76rem; font-style: italic; color: #38bdf8;">${escapeHtml(res.notes || 'Routine care.')}</span>
      </div>

      <!-- Time-Specific Shift Trackers -->
      <div class="quick-track-bar">
        <div class="track-item">
          <span>VS / WT</span>
          <input type="text" placeholder="___/___">
        </div>
        <div class="track-item">
          <span>MEAL %</span>
          <input type="text" placeholder="B_ L_ D_">
        </div>
        <div class="track-item">
          <span>BM TIME</span>
          <input type="text" placeholder="Time/__">
        </div>
        <div class="track-item">
          <span>TURN Q2H</span>
          <input type="text" placeholder="08/10/12">
        </div>
        <div class="track-item">
          <span>SHOWER</span>
          <input type="text" placeholder="Done/Ref">
        </div>
      </div>

      <div class="res-actions no-print">
        <button class="btn-icon btn-edit" onclick="editResident('${res.id}')" title="Edit Resident">
          <i data-lucide="edit-3"></i>
        </button>
        <button class="btn-icon btn-delete" onclick="deleteResident('${res.id}')" title="Delete Resident">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById('layoutSelect').addEventListener('change', renderGrid);
  
  document.getElementById('btnPrintBW').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btnQuickDemo').addEventListener('click', () => {
    residentsData = [...sampleResidents];
    saveData();
    renderGrid();
  });

  document.getElementById('btnClearAll').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all resident data for this shift?')) {
      residentsData = [];
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
      facility: document.getElementById('facilityName').value,
      date: document.getElementById('shiftDate').value,
      shift: document.getElementById('shiftType').value,
      hall: document.getElementById('hallUnit').value,
      cna: document.getElementById('cnaName').value,
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

  // Import JSON
  document.getElementById('btnImportJSON').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });

  document.getElementById('importFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.residents && Array.isArray(imported.residents)) {
          residentsData = imported.residents;
          if (imported.facility) document.getElementById('facilityName').value = imported.facility;
          if (imported.shift) document.getElementById('shiftType').value = imported.shift;
          if (imported.hall) document.getElementById('hallUnit').value = imported.hall;
          if (imported.cna) document.getElementById('cnaName').value = imported.cna;
          saveData();
          renderGrid();
          alert('Shift report loaded successfully!');
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (err) {
        alert('Error reading JSON file.');
      }
    };
    reader.readAsText(file);
  });
}

// Modal Functions
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
    notes: document.getElementById('mNotes').value
  };

  if (resId) {
    const idx = residentsData.findIndex(r => r.id === resId);
    if (idx !== -1) residentsData[idx] = resObj;
  } else {
    residentsData.push(resObj);
  }

  saveData();
  renderGrid();
  closeModal();
}

window.editResident = function(id) {
  openModal(id);
};

window.deleteResident = function(id) {
  if (confirm('Delete this resident from the shift report?')) {
    residentsData = residentsData.filter(r => r.id !== id);
    saveData();
    renderGrid();
  }
};

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
