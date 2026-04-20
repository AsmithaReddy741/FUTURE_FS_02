const API = "https://your-render-backend-url";

// Add Lead
function addLead() {
  console.log("Adding lead...");

  fetch(API + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      source: document.getElementById("source").value,
      notes: document.getElementById("notes").value
    }),
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);
    loadLeads();
  })
  .catch(err => console.error(err));
}


// Load Leads
function loadLeads() {
  fetch(API + "/leads")
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(lead => {
        html += `
          <div class="lead">
            <b>${lead.name}</b><br>
            ${lead.email}<br>
            Source: ${lead.source}<br>
            Status: ${lead.status}<br>
            Notes: ${lead.notes}<br>

            <select onchange="updateStatus('${lead._id}', this.value)">
              <option ${lead.status==="New"?"selected":""}>New</option>
              <option ${lead.status==="Contacted"?"selected":""}>Contacted</option>
              <option ${lead.status==="Converted"?"selected":""}>Converted</option>
            </select>

            <br>
            <button onclick="deleteLead('${lead._id}')">Delete</button>
          </div>
        `;
      });
      document.getElementById("leads").innerHTML = html;
    });
}

// Update Status
function updateStatus(id, status) {
  fetch(API + "/update/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).then(() => loadLeads());
}

// Delete Lead
function deleteLead(id) {
  fetch(API + "/delete/" + id, {
    method: "DELETE",
  }).then(() => loadLeads());
}

// Load initially
loadLeads();
