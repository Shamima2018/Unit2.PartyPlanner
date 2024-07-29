const COHORT = "2405-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#parties");
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);
//const deletePartyForm = document.querySelector("#deleteParty");
//deletePartyForm.addEventListener("submit", deleteParty);


/**
 * Sync state with the API and rerender
 */
async function render() {
  await getParties();
  renderParties();

}
render();

/**
 * Update state with parties from API
 */
async function getParties() {
  // TODO
  const response = await fetch(API_URL);
  const json = await response.json();
  state.parties = json.data;
}

/**
 * Render Parties from state
 */
function renderParties() {
  // TODO

  if (!state.parties.length) {
    partyList.innerHTML = "<li>No parties</li>";
    return;
  }
  const partyCards = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.date}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
        <button id=${party.id} class="delete" type="submit"> Delete party </button>

      `;
    return li;
  });
  partyList.replaceChildren(...partyCards);
  const deleteBtns = document.querySelectorAll(".delete")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("submit", deleteParty)
  })
  console.log(deleteBtns);

}


/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addParty(event) {
  event.preventDefault();

  // TODO
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        date: new Date(addPartyForm.date.value).toISOString(),
        location: addPartyForm.location.value,
        description: addPartyForm.description.value,
      }),
    });
    render();

  } catch (error) {
    console.log(error)
  }
}

async function deleteParty(event) {
  event.preventDefault();

  // TODO
  try {
    const response = await fetch(`${API_URL}/${event.target.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    
    });

    render();

  } catch (error) {
    console.log(error)
  }
}

