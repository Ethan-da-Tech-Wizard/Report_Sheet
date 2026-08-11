import os

TEMPLATES_DIR = '/home/ethan/Report_Sheet/templates'
os.makedirs(TEMPLATES_DIR, exist_ok=True)

header_template = """<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>PointClickCare Universal Master CNA Shift Worksheet</title>
  <style>
    @page WordSection1 { size: 11in 8.5in; margin: 0.25in; mso-page-orientation: landscape; }
    div.WordSection1 { page: WordSection1; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 7.5pt; color: #000; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; }
    td, th { border: 1px solid #000; padding: 4px; text-align: left; vertical-align: top; height: 52px; line-height: 1.35; }
    th { background: #e2e8f0; color: #000; font-weight: bold; text-transform: uppercase; font-size: 7pt; text-align: center; }
    .header-bar { border: 1.5px solid #000; padding: 4px 8px; margin-bottom: 6px; font-weight: bold; font-size: 8.5pt; }
    .chk { display: inline-block; width: 8.5px; height: 8.5px; border: 1px solid #000; margin-right: 1.5px; }
  </style>
</head>
<body>
<div class="WordSection1">
"""

footer_template = """</div></body></html>"""

flavor_content_universal = """
<div class="header-bar">
  <table style="border:none; width:100%;">
    <tr style="border:none;">
      <td style="border:none;"><b>FACILITY:</b> Santé of Mesa (PCC)</td>
      <td style="border:none;"><b>DATE:</b> ____________</td>
      <td style="border:none;"><b>SHIFT:</b> [ ] DAY  [ ] EVE  [ ] NOC</td>
      <td style="border:none;"><b>HALL / UNIT:</b> ____________</td>
      <td style="border:none;"><b>CNA NAME:</b> ________________________</td>
      <td style="border:none;"><b>CHARGE NURSE:</b> ________________</td>
    </tr>
  </table>
</div>

<table>
  <tr>
    <th width="7%">Rm & Name</th>
    <th width="6%">Code</th>
    <th width="12%">PCC Diet & Liquids</th>
    <th width="12%">PCC ADL & Equip</th>
    <th width="10%">Brief & Toilet</th>
    <th width="18%">VITALS (BP / HR / T / O2 / RR)</th>
    <th width="14%">Q2H Turn & BM Log</th>
    <th width="11%">Safety & Notes</th>
  </tr>
  """ + "".join([f"<tr><td><b>Rm:</b> ____<br/><b>Name:</b><br/>__________</td><td align='center'>FULL /<br/>DNR<br/>DNI /<br/>POLST</td><td><b>DIET:</b> REG / MECH /<br/>MOIST / PUREE / NPO<br/><b>LIQ:</b> THIN / NECT /<br/>HONY / PUDD /<br/>RESTR</td><td><b>ADL:</b> IND / SUP / LIM /<br/>EXT / TOT<br/><b>EQUIP:</b> 1PA / 2PA |<br/>FWW / HYR / SARA /<br/>WC</td><td><b>SIZE:</b> M / L / XL /<br/>2XL / 3XL<br/><b>TYPE:</b> BRIEF /<br/>FOLEY / OSTOMY</td><td><b>BP:</b> ________________________<br/><b>HR:</b> _________  <b>T:</b> _________<br/><b>O2:</b> _______% ( <span class='chk'></span><b>RA</b> <span class='chk'></span><b>NC</b> )<br/><b>RR:</b> _________</td><td><b>TURNS:</b> <span class='chk'></span>8 <span class='chk'></span>10 <span class='chk'></span>12 <span class='chk'></span>2<br/><span class='chk'></span>4 <span class='chk'></span>6<br/><b>BM:</b> <span class='chk'></span>0 <span class='chk'></span>S <span class='chk'></span>M <span class='chk'></span>L<br/><b>ADL:</b> <span class='chk'></span>Shower <span class='chk'></span>Bath <span class='chk'></span>Skin <span class='chk'></span>Oral</td><td><span class='chk'></span>Fall <span class='chk'></span>LoBd <span class='chk'></span>Iso<br/><b>Notes:</b></td></tr>" for _ in range(14)]) + """
</table>
"""

fpath_universal = os.path.join(TEMPLATES_DIR, "PointClickCare_Universal_Master_Worksheet.doc")
with open(fpath_universal, 'w', encoding='utf-8') as f:
    f.write(header_template + flavor_content_universal + footer_template)
print(f"Generated Universal Master template with Shower: {fpath_universal}")

