/* Data transcribed from the supplied EcoGEO v3 manuscript, Table 1. */
(() => {
  'use strict';
  const backbones = ['GPT-5.1', 'Claude-Sonnet-4.5', 'Qwen-3.6-27B'];
  const methods = ['Single-Page', 'Single-Page C-SEO', 'Multi-Page C-SEO', 'TRACE'];
  const metrics = ['Recommendation', 'First Crawl', 'Follow-Up Search', 'Follow-Up Crawl', 'Internal Crawl'];
  const descriptions = [
    'Final answer explicitly mentions and recommends the target.',
    'Crawls the target result during the initial search round.',
    'Issues a target-specific query after the initial search round.',
    'First crawls a target-related page after the initial search round.',
    'Crawls a target-related link from a visited page, not search results.'
  ];
  const results = {
    safesearch: [
      [[35.9,35.9,39.1,67.2],[14.1,12.5,20.3,42.2],[20.3,15.6,6.2,35.9],[23.4,25,21.9,26.6],[null,null,null,9.4]],
      [[40.6,40.6,48.4,56.2],[10.9,14.1,23.4,31.2],[9.4,7.8,34.4,20.3],[31.2,29.7,25,32.8],[null,null,null,0]],
      [[39.1,31.2,60.9,75],[12.5,12.5,34.4,45.3],[18.8,20.3,21.9,31.2],[12.5,14.1,18.8,29.7],[null,null,null,7.8]]
    ],
    ecommerce: [
      [[56.2,54.5,61.2,71.9],[43.8,38,37.2,61.2],[18.2,21.5,14.9,24],[21.5,19,28.1,15.7],[null,null,null,19]],
      [[52.9,53.7,58.7,65.3],[37.2,30.6,33.9,52.1],[7.4,10.7,22.3,16.5],[19,23.1,26.4,22.3],[null,null,null,1.7]],
      [[61.2,49.6,70.2,74.4],[38.8,32.2,50.4,59.5],[20.7,19.8,27.3,23.1],[9.9,8.3,14,10.7],[null,null,null,6.6]]
    ]
  };
  const roles = [
    {id:'navigation',name:'Navigation',category:'THE GATEWAY',title:'Navigation Page',description:'Introduces the product and six support page types, helping agents explore its features, compare views, and find relevant information.',focus:'Product Overview / Source Discovery / Supporting Page Links',width:1177},
    {id:'official',name:'Official',category:'PRODUCT IDENTITY',title:'Official Website',description:'Presents product specifications, features, pricing, and compatibility from the brand’s perspective to clarify key details and uses.',focus:'Product Details / Specifications / Features / Pricing / Compatibility',width:1154},
    {id:'comparison',name:'Review',category:'COMPARATIVE EVIDENCE',title:'Review Page',description:'Compares the product with alternatives, highlights strengths and weaknesses, and helps agents assess its fit for different needs.',focus:'Product Comparisons / Strengths / Weaknesses / Suitability',width:1440},
    {id:'expert',name:'Expert',category:'DOMAIN PERSPECTIVE',title:'Expert Article',description:'Explains how product features affect specific tasks, helping agents identify key details and weigh practical trade-offs when choosing.',focus:'Expert Insights / Decision Criteria / Practical Trade-Offs',width:1271},
    {id:'news',name:'News',category:'MARKET CONTEXT',title:'News Report',description:'Covers product releases, market developments, and industry trends, helping agents understand the product’s broader market context.',focus:'Product Releases / Market Context / Industry Trends',width:1280},
    {id:'forum',name:'Forum',category:'COMMUNITY DISCUSSION',title:'Forum Thread',description:'Shares user experiences, questions, and concerns through discussions and informal comparisons, showing how users weigh their options.',focus:'User Experiences / Questions / Concerns / Informal Comparisons',width:1273},
    {id:'community',name:'Social',category:'PUBLIC MENTIONS',title:'Social Media Post',description:'Shares brief product mentions, casual comments, and quick reactions, showing how the product appears in everyday social conversations.',focus:'Brief Product Mentions / Comments / Reactions',width:1258}
  ];
  let dataset = 'safesearch';
  let metric = 0;
  let roleIndex = 0;
  const $ = (selector) => document.querySelector(selector);
  const format = value => value === null ? '—' : value.toFixed(1);

  function renderResults() {
    const data = results[dataset];
    $('#chart-title').textContent = `${metrics[metric]} Rate (%)`;
    $('#metric-description').textContent = descriptions[metric];
    $('#metric-property').textContent = metric === 0 ? '(Answer-Level Metric)' : '(Trajectory-Level Metric)';
    $('#results-chart').innerHTML = data.map((model,index) => `<div class="model-chart"><h4>${backbones[index]}</h4>${model[metric].map((value,i) => `<div class="bar-row" aria-label="${methods[i]}: ${value === null ? 'not available' : `${format(value)} percent`}" title="${methods[i]}: ${format(value)}${value === null ? '' : '%'}"><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="--value:${value ?? 0}%"></div></div><span class="bar-value" aria-hidden="true">${format(value)}</span></div>`).join('')}<div class="chart-axis" aria-hidden="true"><span>0</span><span>25</span><span>50</span><span>75</span><span>100%</span></div></div>`).join('');
  }
  document.querySelectorAll('[data-dataset]').forEach(button => button.addEventListener('click', () => {
    dataset = button.dataset.dataset;
    document.querySelectorAll('[data-dataset]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderResults();
  }));
  $('#metric-select').addEventListener('change', event => { metric = Number(event.target.value); renderResults(); });

  function selectRole(index, focus = false) {
    roleIndex = (index + roles.length) % roles.length;
    const role = roles[roleIndex];
    const page = {comparison:'review',community:'social'}[role.id] || role.id;
    const screenshot = `static/images/codeforge-nova-14/${page}.png`;
    document.querySelectorAll('[data-role]').forEach(button => {
      const selected = button.dataset.role === role.id;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
    $('#example-panel').setAttribute('aria-labelledby', `tab-${role.id}`);
    $('#example-image').src = screenshot;
    $('#example-image').width = 1440;
    $('#example-image').height = 1200;
    $('#example-image').alt = `${role.title} example for the fictional CodeForge Nova 14 developer laptop`;
    $('#example-zoom').dataset.zoom = screenshot;
    $('#example-zoom').dataset.caption = `${role.name} Example Page`;
    $('#example-html').href = `static/examples/codeforge-nova-14/${page}.html`;
    $('#example-html').textContent = `Open ${role.name} HTML ↗`;
    $('#example-zoom').setAttribute('aria-label', `Enlarge ${role.name.toLowerCase()} page example`);
    $('#role-title').textContent = role.title;
    $('#role-description').textContent = role.description;
    $('#role-focus').textContent = role.focus;
  }
  document.querySelectorAll('[data-role]').forEach(button => {
    button.addEventListener('click', () => selectRole(roles.findIndex(role => role.id === button.dataset.role)));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = roleIndex + 1;
      if (event.key === 'ArrowLeft') next = roleIndex - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = roles.length - 1;
      if (next !== undefined) { event.preventDefault(); selectRole(next,true); }
    });
  });

  const dialog = $('#image-dialog');
  $('#example-image-open').addEventListener('click', () => $('#example-zoom').click());
  let priorFocus;
  document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    priorFocus = button;
    $('#dialog-image').src = button.dataset.zoom;
    $('#dialog-image').alt = button.dataset.caption;
    $('#dialog-caption').textContent = button.dataset.caption;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; priorFocus?.focus(); });

  $('#copy-bibtex').addEventListener('click', async () => {
    const citation = $('#bibtex-code').innerText;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(citation);
      $('#copy-status').textContent = 'BibTeX copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#bibtex-code'));
      selection.removeAllRanges();
      selection.addRange(range);
      $('#copy-status').textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
      $('#bibtex-code').focus();
    }
  });
  renderResults();
})();
