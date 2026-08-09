// SANTÉ OF MESA — CNA MASTER REPORT SHEET & HANDOFF SYSTEM
// Version: CNA-HO-01 Rev 2026-08-04

const full12Residents = [
  {
    id: "res-101a",
    room: "101-A",
    name: "Davis, Robert (prefers 'Bob')",
    codeStatus: "FULL CODE",
    transfer: "1PA + FWW · WBAT",
    diet: "Regular · Thin Liq",
    fluid: "Encourage Fluids",
    bowelBladder: "Brief L · Continence",
    shower: "Today EVE",
    vitalsFreq: "VS 14:00",
    accuChek: "AC & HS (BS)",
    safety: "Fall Risk · Bed Low · Alarm",
    notes: "Right hip post-op. Reposition Q2H (08/10/12/14). Float heels in bed."
  },
  {
    id: "res-101b",
    room: "101-B",
    name: "Martinez, Elena",
    codeStatus: "DNR",
    transfer: "2PA · S2S Lift",
    diet: "IDDSI 6 Mech Soft",
    fluid: "FR 1500mL (Allot 500mL) · Strict I&O",
    bowelBladder: "Foley (Empty/Measure Q)",
    shower: "Tue/Fri DAY",
    vitalsFreq: "Q4H (14/18/22)",
    accuChek: "N/A",
    safety: "Bed Low · Floor Mat",
    notes: "CHF history. Strict I&O. Empty Foley at 18:00 & 22:00. Report SOB immediately."
  },
  {
    id: "res-102a",
    room: "102-A",
    name: "Johnson, Clara",
    codeStatus: "DNR/DNI",
    transfer: "2PA · Full Mech Lift (FML Sz M)",
    diet: "IDDSI 4 Puree · IDDSI 2 Mildly Thick",
    fluid: "1:1 Feed Assist · No Straw",
    bowelBladder: "Total Incontinent · Brief XL",
    shower: "Bed Bath Today",
    vitalsFreq: "Q Shift",
    accuChek: "N/A",
    safety: "CONTACT ISO · O2 2L NC · Aspiration Prec",
    notes: "Aspiration risk: Upright 90° for meals & 30m after. Dedicated BP cuff in room."
  },
  {
    id: "res-102b",
    room: "102-B",
    name: "Wilson, Arthur",
    codeStatus: "FULL CODE",
    transfer: "Independent · Cane",
    diet: "Regular (Cut meat)",
    fluid: "Independent",
    bowelBladder: "Independent",
    shower: "Mon/Thu NOC",
    vitalsFreq: "Q Shift",
    accuChek: "11:30 & 16:30",
    safety: "Self-Transfer · Non-skid",
    notes: "PT/OT at 10:00. Dressed by 09:30 with FWW & shoes. Discharge Friday."
  },
  {
    id: "res-103a",
    room: "103-A",
    name: "Taylor, Martha",
    codeStatus: "DNR",
    transfer: "1PA · Wheelchair / Gait Belt",
    diet: "IDDSI 6 Soft · IDDSI 2 Mildly Thick",
    fluid: "Encourage Fluids",
    bowelBladder: "Brief M · Toilet Q2H",
    shower: "Today EVE",
    vitalsFreq: "BID (08/16)",
    accuChek: "N/A",
    safety: "Wandering / Elopement · Fall Risk",
    notes: "Dementia, sundowning. Reassure frequently. Approach from front with 1-step cues."
  },
  {
    id: "res-103b",
    room: "103-B",
    name: "Gomez, Francisco",
    codeStatus: "FULL CODE",
    transfer: "1PA Standby · Gait Belt",
    diet: "Regular · NAS (Low Salt)",
    fluid: "Encourage Fluids",
    bowelBladder: "Urinal / Standby",
    shower: "Wed/Sat DAY",
    vitalsFreq: "Q Shift",
    accuChek: "AC & HS",
    safety: "Left side weakness · Fall Risk",
    notes: "Stroke rehab. Dress affected left arm first. Encourage left arm use during care."
  },
  {
    id: "res-104a",
    room: "104-A",
    name: "Smith, Catherine",
    codeStatus: "POLST/COLST",
    transfer: "2PA · Pivot Transfer",
    diet: "Regular",
    fluid: "Independent",
    bowelBladder: "Ostomy Pouch (Empty/Record)",
    shower: "Today DAY",
    vitalsFreq: "Q Shift",
    accuChek: "N/A",
    safety: "Skin Integrity · Heel Protectors",
    notes: "Check/empty Ostomy pouch Q Shift. Turn Q2H. Report redness over sacrum to RN."
  },
  {
    id: "res-104b",
    room: "104-B",
    name: "Baker, Harold",
    codeStatus: "FULL CODE",
    transfer: "Strict Bedrest",
    diet: "NPO (Pre-Op)",
    fluid: "NPO · IV Fluids Active",
    bowelBladder: "Foley Catheter",
    shower: "Bed Bath",
    vitalsFreq: "Q2H Vitals",
    accuChek: "Q4H BG",
    safety: "Strict Bedrest · Fall Risk",
    notes: "NPO for procedure tomorrow morning. Oral care Q2H. Do not offer food or water."
  },
  {
    id: "res-105a",
    room: "105-A",
    name: "Henderson, Walter",
    codeStatus: "FULL CODE",
    transfer: "1PA + FWW · WBAT",
    diet: "IDDSI 6 Mech Soft",
    fluid: "2000mL Daily Goal",
    bowelBladder: "Urinal · 1PA Assist",
    shower: "Mon/Thu DAY",
    vitalsFreq: "Q Shift",
    accuChek: "N/A",
    safety: "Fall Risk · Non-skid footwear",
    notes: "Right total knee replacement rehab. Apply ice pack to R knee after therapy session."
  },
  {
    id: "res-105b",
    room: "105-B",
    name: "Ramirez, Sofia",
    codeStatus: "DNR",
    transfer: "1PA Setup · Standby",
    diet: "Regular · Diabetic Diet",
    fluid: "Independent",
    bowelBladder: "Brief S · Assist",
    shower: "Today EVE",
    vitalsFreq: "Q Shift",
    accuChek: "AC & HS (BS)",
    safety: "Bed Low · Call Light in Reach",
    notes: "Diabetic foot care. Inspect skin during hygiene. Ensure non-skid socks worn."
  },
  {
    id: "res-106a",
    room: "106-A",
    name: "Nguyen, Bao",
    codeStatus: "FULL CODE",
    transfer: "2PA · S2S Lift",
    diet: "IDDSI 4 Puree · IDDSI 3 Mod Thick",
    fluid: "1:1 Feed Assist · Small Sips",
    bowelBladder: "Incontinent · Brief L",
    shower: "Tue/Fri EVE",
    vitalsFreq: "Q Shift",
    accuChek: "N/A",
    safety: "Aspiration Risk · Choking Prec",
    notes: "Aspiration precautions: Small bites, no straw. If coughing occurs, stop & notify nurse."
  },
  {
    id: "res-106b",
    room: "106-B",
    name: "Campbell, Dorothy",
    codeStatus: "DNR",
    transfer: "1PA · Pivot Transfer",
    diet: "Regular",
    fluid: "Independent",
    bowelBladder: "Commode · 1PA Assist",
    shower: "Today DAY",
    vitalsFreq: "BID (08/16)",
    accuChek: "N/A",
    safety: "High Fall Risk · Bed Alarm ON",
    notes: "Parkinson's disease. Allow extra time for transfers. Freezing gait at doorways."
  }
];

let residentsData = [];

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  renderCurrentView();
  updateDateDefault();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Load stored data or default
function loadData() {
  const saved = localStorage.getItem('sante_cna_full12_residents');
  if (saved) {
    try {
      residentsData = JSON.parse(saved);
    } catch (e) {
      residentsData = [...full12Residents];
    }
  } else {
    residentsData = [...full12Residents];
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('sante_cna_full12_residents', JSON.stringify(residentsData));
}

// Set Today's Date
function updateDateDefault() {
  const dateInput = document.getElementById('shiftDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
}

// Switch between Table Matrix View and Grid Cards View
function renderCurrentView() {
  const viewSelect = document.getElementById('viewModeSelect');
  const viewMode = viewSelect ? viewSelect.value : 'table';
  const tableView = document.getElementById('tableMatrixView');
  const cardsView = document.getElementById('cardsGridView');

  if (viewMode === 'table') {
    tableView.style.display = 'block';
    cardsView.style.display = 'none';
    renderTableMatrix();
  } else {
    tableView.style.display = 'none';
    cardsView.style.display = 'block';
    renderGridCards(viewMode);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// RENDER B&W ROWS AND COLUMNS MASTER TABLE
function renderTableMatrix() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  if (residentsData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" style="text-align: center; padding: 20px; color: var(--text-muted);">
          No residents loaded. Click "Reset Full 12 Data" to populate the sheet.
        </td>
      </tr>
    `;
    return;
  }

  residentsData.forEach((res, index) => {
    const isDNR = (res.codeStatus || '').toUpperCase().includes('DNR');
    const isFall = (res.safety || '').toLowerCase().includes('fall');
    const isIso = (res.safety || '').toLowerCase().includes('iso');
    const codeBadgeClass = isDNR ? 'code-dnr' : 'code-full';

    const tr = document.createElement('tr');

    tr.innerHTML = `
      <!-- 1. Room # -->
      <td class="cell-room">${escapeHtml(res.room)}</td>

      <!-- 2. Resident Name & Code -->
      <td>
        <span class="cell-res-name">${escapeHtml(res.name)}</span>
        <span class="cell-code-badge ${codeBadgeClass}">${escapeHtml(res.codeStatus)}</span>
      </td>

      <!-- 3. Mobility & Transfer Assist -->
      <td>
        <span class="cell-val">${escapeHtml(res.transfer)}</span>
      </td>

      <!-- 4. Diet / Fluid / I&O -->
      <td>
        <span class="cell-val"><b>${escapeHtml(res.diet)}</b></span>
        <span class="cell-label" style="margin-top: 2px;">${escapeHtml(res.fluid)}</span>
      </td>

      <!-- 5. Toileting & Continence -->
      <td>
        <span class="cell-val">${escapeHtml(res.bowelBladder)}</span>
      </td>

      <!-- 6. Shower Schedule -->
      <td>
        <span class="cell-val" style="font-weight: 800;">${escapeHtml(res.shower)}</span>
      </td>

      <!-- 7. Vitals & BG -->
      <td>
        <span class="cell-val">${escapeHtml(res.vitalsFreq)}</span>
        <span class="cell-label">${escapeHtml(res.accuChek || 'N/A')}</span>
      </td>

      <!-- 8. Safety & Precautions -->
      <td>
        <span class="cell-val ${isFall ? 'cell-alert' : ''} ${isIso ? 'cell-danger' : ''}">
          ${escapeHtml(res.safety)}
        </span>
      </td>

      <!-- 9. Shift Focus & Clinical Notes -->
      <td>
        <span class="cell-val" style="font-size: 0.74rem;">${escapeHtml(res.notes)}</span>
      </td>

      <!-- 10. Action Trackers (Handwrite or Type) -->
      <td>
        <div class="table-trackers">
          <div class="tracker-slot"><span>VS:</span> <input type="text" placeholder="__/__"></div>
          <div class="tracker-slot"><span>MEAL:</span> <input type="text" placeholder="B_L_D_"></div>
          <div class="tracker-slot"><span>BM:</span> <input type="text" placeholder="Time"></div>
          <div class="tracker-slot"><span>TURN:</span> <input type="text" placeholder="08_10_"></div>
        </div>
      </td>

      <!-- 11. Screen Edit/Delete -->
      <td class="no-print" style="text-align: center;">
        <button class="btn-table-action" onclick="editResident('${res.id}')" title="Edit">
          <i data-lucide="edit-2" style="width: 14px; height: 14px;"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// RENDER GRID CARDS VIEW
function renderGridCards(layoutMode) {
  const gridContainer = document.getElementById('residentGrid');
  gridContainer.className = `resident-grid grid-${layoutMode}`;
  gridContainer.innerHTML = '';

  residentsData.forEach((res) => {
    const isDNR = (res.codeStatus || '').toUpperCase().includes('DNR');
    const isFall = (res.safety || '').toLowerCase().includes('fall');
    const codeClass = isDNR ? 'code-dnr' : 'code-full';

    const card = document.createElement('div');
    card.className = `res-card ${isDNR ? 'card-dnr' : ''}`;

    card.innerHTML = `
      <div class="res-header">
        <span class="cell-room" style="background:#0284c7;color:#fff;padding:2px 6px;border-radius:4px;">${escapeHtml(res.room)}</span>
        <span class="cell-res-name" style="margin-left:6px;flex-grow:1;">${escapeHtml(res.name)}</span>
        <span class="cell-code-badge ${codeClass}">${escapeHtml(res.codeStatus)}</span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.75rem; margin-top:4px;">
        <div><span class="cell-label">TRANSFER:</span> <b>${escapeHtml(res.transfer)}</b></div>
        <div><span class="cell-label">DIET / FLUID:</span> <b>${escapeHtml(res.diet)}</b></div>
        <div><span class="cell-label">ELIMINATION:</span> ${escapeHtml(res.bowelBladder)}</div>
        <div><span class="cell-label">SHOWER:</span> <b>${escapeHtml(res.shower)}</b></div>
        <div><span class="cell-label">VITALS/BG:</span> ${escapeHtml(res.vitalsFreq)} | ${escapeHtml(res.accuChek || 'N/A')}</div>
        <div><span class="cell-label">SAFETY:</span> <b style="color:${isFall ? 'var(--accent-gold)' : 'inherit'};">${escapeHtml(res.safety)}</b></div>
      </div>

      <div style="margin-top:4px;"><span class="cell-label">FOCUS:</span> <i>${escapeHtml(res.notes)}</i></div>

      <div class="table-trackers" style="margin-top:6px;">
        <div class="tracker-slot"><span>VS:</span> <input type="text" placeholder="__/__"></div>
        <div class="tracker-slot"><span>MEAL:</span> <input type="text" placeholder="B_L_D_"></div>
        <div class="tracker-slot"><span>BM:</span> <input type="text" placeholder="Time"></div>
        <div class="tracker-slot"><span>TURN:</span> <input type="text" placeholder="08_10_"></div>
      </div>

      <div class="no-print" style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px;">
        <button class="btn-table-action" onclick="editResident('${res.id}')"><i data-lucide="edit-2" style="width:14px;"></i></button>
        <button class="btn-table-action" onclick="deleteResident('${res.id}')" style="color:var(--danger);"><i data-lucide="trash" style="width:14px;"></i></button>
      </div>
    `;

    gridContainer.appendChild(card);
  });
}

// Event Listeners
function setupEventListeners() {
  document.getElementById('viewModeSelect').addEventListener('change', renderCurrentView);

  document.getElementById('btnPrintBW').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btnQuickDemo').addEventListener('click', () => {
    residentsData = [...full12Residents];
    saveData();
    renderCurrentView();
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

  // Export JSON
  document.getElementById('btnExportJSON').addEventListener('click', () => {
    const exportData = {
      facility: document.getElementById('facilityName').value,
      date: document.getElementById('shiftDate').value,
      shift: document.getElementById('shiftType').value,
      hall: document.getElementById('hallUnit').value,
      cna: document.getElementById('cnaName').value,
      incomingCna: document.getElementById('incomingCnaName').value,
      nurse: document.getElementById('nurseName').value,
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
          if (imported.incomingCna) document.getElementById('incomingCnaName').value = imported.incomingCna;
          if (imported.nurse) document.getElementById('nurseName').value = imported.nurse;
          saveData();
          renderCurrentView();
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

// Modal functions
function openModal(resId = null) {
  const modal = document.getElementById('residentModal');
  const title = document.getElementById('modalTitle');

  if (resId) {
    const res = residentsData.find(r => r.id === resId);
    if (res) {
      title.innerText = "Edit Resident Data";
      document.getElementById('modalResidentId').value = res.id;
      document.getElementById('mRoom').value = res.room || '';
      document.getElementById('mName').value = res.name || '';
      document.getElementById('mCodeStatus').value = res.codeStatus || 'FULL CODE';
      document.getElementById('mDiet').value = res.diet || '';
      document.getElementById('mFluid').value = res.fluid || '';
      document.getElementById('mTransfer').value = res.transfer || '';
      document.getElementById('mBowelBladder').value = res.bowelBladder || '';
      document.getElementById('mAdlLevel').value = res.adlLevel || '';
      document.getElementById('mShower').value = res.shower || '';
      document.getElementById('mVitalsFreq').value = res.vitalsFreq || '';
      document.getElementById('mAccuChek').value = res.accuChek || '';
      document.getElementById('mSafety').value = res.safety || '';
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
    accuChek: document.getElementById('mAccuChek').value,
    safety: document.getElementById('mSafety').value,
    notes: document.getElementById('mNotes').value
  };

  if (resId) {
    const idx = residentsData.findIndex(r => r.id === resId);
    if (idx !== -1) residentsData[idx] = resObj;
  } else {
    residentsData.push(resObj);
  }

  saveData();
  renderCurrentView();
  closeModal();
}

window.editResident = function(id) {
  openModal(id);
};

window.deleteResident = function(id) {
  if (confirm('Delete this resident from the report sheet?')) {
    residentsData = residentsData.filter(r => r.id !== id);
    saveData();
    renderCurrentView();
  }
};

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
