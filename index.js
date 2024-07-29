const COHORT = "2405-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#parties");
con
console.log()
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);
const deletePartyForm = document.querySelector("#deleteParty");
deletePartyForm.addEventListener("submit", deleteParty);


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
        <p>${party.time}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
      `;
    return li;
  });
}
partyList.replaceChildren(...partyCards);


/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
function addParty(event) {
  event.preventDefault();

  // TODO
  try {
    const response = fetch("API_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        date: addPartyForm.date.value,
        time: addPartyForm.time.value,
        location: addPartyForm.location.value,
        description: addPartyForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create party");
    }
    for (let i = 0; i < state.parties.length; i++) {
      render(event);
    }

  } catch (error) {
    console.log(error)
  }
}

function deleteParty(event) {
  event.preventDefault();

  // TODO
  try {
    const response = fetch("API_URL", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: deletePartyForm.name.value,
        date: deletePartyForm.date.value,
        time: deletePartyForm.time.value,
        location: deletePartyForm.location.value,
        description: deletePartyForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete party");
    }

    for (let i = 0; i <= state.parties.length; i--) {
      render(event);
    }
  } catch (error) {
    console.log(error)
  }
}

