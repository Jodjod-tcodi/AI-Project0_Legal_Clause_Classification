// Professional Legal Clause Benchmark Inspector
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  const datasetItems = [
    { id: 1, category: "Governing Law", text: "This Agreement is to be construed according to the laws of the State of Illinois.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 2, category: "Governing Law", text: "This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts...", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 3, category: "Governing Law", text: "It will be governed by the law of the People's Republic of China, otherwise governed by UN Convention on International Sale of Goods.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 4, category: "Governing Law", text: "This Agreement was entered into in the State of Florida, and its validity, construction, interpretation, and legal effect shall be governed by Florida laws.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 5, category: "Governing Law", text: "This Agreement shall be governed and construed according to the laws of the State of Kansas.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 6, category: "Governing Law", text: "This Agreement shall be governed by the laws of the State of Texas, without reference to its conflicts of law principles.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 7, category: "Governing Law", text: "This Amendment shall be governed by and construed in accordance with the laws of Japan.", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 8, category: "Governing Law", text: "This Agreement and any and all matters arising directly or indirectly herefrom shall be governed by and construed in accordance with the internal laws...", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 9, category: "Governing Law", text: "This Agreement and the relationship between the Parties shall be governed by, and interpreted in accordance with New York law...", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },
    { id: 10, category: "Governing Law", text: "THIS REMARKETING AGREEMENT SHALL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE WITH THE LAWS OF THE STATE OF NEW YORK...", llama: "Governing Law", cheap: "Governing Law", top: "Governing Law" },

    { id: 11, category: "Termination", text: "Either party may terminate this Agreement without cause at any time effective upon thirty (30) days' written notice.", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 12, category: "Termination", text: "Either Consultant or Company may terminate this Agreement upon prior written notice thereof to the other party.", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 13, category: "Termination", text: "Either Party shall have the right to terminate this Agreement before the end of the Term for its convenience upon written notice...", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 14, category: "Termination", text: "PPI shall have the right, exercisable upon sixty (60) days prior written notice to EKR, to terminate the Lease Term...", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 15, category: "Termination", text: "After the Initial Term, this Agreement shall continue on a month to month basis until terminated by either party upon thirty days notice...", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 16, category: "Termination", text: "This Agreement may be terminated at any time, without penalty, by the Board of Trustees on not less than 60 days written notice.", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 17, category: "Termination", text: "This Agreement may be terminated by Nuance at any time, in its sole discretion, prior to the Distribution...", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 18, category: "Termination", text: "This Agreement may also be terminated by either party upon ninety (90) days written notice.", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 19, category: "Termination", text: "Dynamic Hearing may terminate this Agreement upon three (3) months written notice to IntriCon of such termination.", llama: "Termination", cheap: "Termination", top: "Termination" },
    { id: 20, category: "Termination", text: "Agent shall have the option, in its sole discretion, to terminate the use of the E-Commerce Platform at any time after four weeks of use.", llama: "Termination", cheap: "Termination", top: "Termination" },

    { id: 21, category: "Non-Compete", text: "When endorsing a non-competitive product, under no circumstances shall CONSULTANT wear, play, use or be associated with competitor's Product.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 22, category: "Non-Compete", text: "Consultant agrees to use best efforts to segregate Consultant's work from competitive activities during the engagement term.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 23, category: "Non-Compete", text: "Neither Valeant nor its Affiliates shall, directly or indirectly, compete in the Territory other than the Product...", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 24, category: "Non-Compete", text: "During the Term, PPI and its Affiliates shall not: file for Marketing Authorization for any Competing Product, manufacture, or market Competing Products.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 25, category: "Non-Compete", text: "Member covenants and agrees that during the Post-Term Period, Member shall not own, manage, engage in, or consult for any Competitive Business within 3 miles.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 26, category: "Non-Compete", text: "You agree that during the term of this Agreement, you will not, without our prior written consent, directly or indirectly engage in competitive business.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 27, category: "Non-Compete", text: "Party A irrevocably undertakes that it shall not conduct any other business that may be competitive with or cause adverse effect to Party B's business.", llama: "Termination", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 28, category: "Non-Compete", text: "CNET will not enter into agreements with Competing Computer Products Retailers for displaying permanent links or fixed promotions.", llama: "Termination", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 29, category: "Non-Compete", text: "Party B or Party B's affiliate cooperates with any entity competitive with Didi in any form without prior written notice...", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },
    { id: 30, category: "Non-Compete", text: "DIALOG agrees that it and its Affiliates will not intentionally sell, distribute or work with any third party to develop competing Uncoupled Power Transfer Technology.", llama: "Non-Compete", cheap: "Non-Compete", top: "Non-Compete" },

    { id: 31, category: "Exclusivity", text: "Distributor is granted exclusive rights to market, sell and distribute the Products throughout the designated Territory during the Term.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 32, category: "Exclusivity", text: "Company hereby appoints Licensee as its sole and exclusive licensee to manufacture and sell the Licensed Products worldwide.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 33, category: "Exclusivity", text: "During the Exclusivity Period, Seller agrees not to solicit, encourage, or entertain any offers or proposals from third parties regarding acquisition.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 34, category: "Exclusivity", text: "Supplier agrees to supply the Products exclusively to Buyer in the Medical Device Field within North America.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 35, category: "Exclusivity", text: "Publisher grants Author the exclusive right to publish, distribute and license the Work in all languages throughout the World.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 36, category: "Exclusivity", text: "Client agrees that Agency shall be the sole and exclusive provider of digital advertising management services for the Brand.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 37, category: "Exclusivity", text: "During the Term, neither Party shall enter into discussions with third parties concerning competitive strategic joint ventures.", llama: "Termination", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 38, category: "Exclusivity", text: "The rights granted hereunder are strictly exclusive to Licensee and no duplicate licenses shall be issued by Licensor.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },
    { id: 39, category: "Exclusivity", text: "Vendor shall not offer the custom software module developed under this SOW to any other commercial customer.", llama: "Termination", cheap: "Non-Compete", top: "Exclusivity" },
    { id: 40, category: "Exclusivity", text: "Company guarantees Franchisee exclusive territory protection within a five-mile radius of the store location.", llama: "Exclusivity", cheap: "Exclusivity", top: "Exclusivity" },

    { id: 41, category: "Indemnification", text: "Contractor agrees to defend, indemnify and hold harmless Company from and against any claims, losses, or damages arising from breach.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 42, category: "Indemnification", text: "Each Party shall indemnify the other against third-party intellectual property infringement claims resulting from authorized product use.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 43, category: "Indemnification", text: "Tenant agrees to indemnify Landlord for any personal injury or property damage occurring on the leased premises due to negligence.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 44, category: "Indemnification", text: "Neither Party shall be liable for indirect, incidental, or consequential damages, and total liability shall be capped at total fees paid.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 45, category: "Indemnification", text: "Licensor will defend Licensee against any suit alleging that the Software infringes any US patent or copyright.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 46, category: "Indemnification", text: "Buyer shall indemnify Seller for all loss, cost, liability or expense arising out of Buyer's modification or misuse of Products.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 47, category: "Indemnification", text: "Consultant agrees to hold harmless Client and its directors from liabilities arising from Consultant's willful misconduct.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 48, category: "Indemnification", text: "Company's aggregate liability under this Agreement shall not exceed the amount actually paid by Customer in the preceding 12 months.", llama: "Termination", cheap: "Indemnification", top: "Indemnification" },
    { id: 49, category: "Indemnification", text: "Service Provider shall indemnify Client for regulatory fines resulting directly from Service Provider's security failure.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" },
    { id: 50, category: "Indemnification", text: "Each Party agrees to indemnify the other for losses caused by material breach of confidentiality obligations.", llama: "Indemnification", cheap: "Indemnification", top: "Indemnification" }
  ];

  function renderTable(items) {
    tableBody.innerHTML = "";
    if (items.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #64748b;">No matching entries found.</td></tr>`;
      return;
    }

    items.forEach((item) => {
      const tr = document.createElement("tr");

      const isLlamaPass = item.llama === item.category;
      const isCheapPass = item.cheap === item.category;
      const isTopPass = item.top === item.category;

      tr.innerHTML = `
        <td style="font-weight: 500; color: #64748b;">${item.id}</td>
        <td class="clause-text">${item.text}</td>
        <td><span class="gt-pill">${item.category}</span></td>
        <td>
          <span class="pred-pill ${isLlamaPass ? 'pred-pass' : 'pred-fail'}">
            ${item.llama}
          </span>
        </td>
        <td>
          <span class="pred-pill ${isCheapPass ? 'pred-pass' : 'pred-fail'}">
            ${item.cheap}
          </span>
        </td>
        <td>
          <span class="pred-pill ${isTopPass ? 'pred-pass' : 'pred-fail'}">
            ${item.top}
          </span>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  }

  function filterItems() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = datasetItems.filter((item) => {
      const matchesSearch = item.text.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
      const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });

    renderTable(filtered);
  }

  searchInput.addEventListener("input", filterItems);
  categoryFilter.addEventListener("change", filterItems);

  renderTable(datasetItems);
});
