const state = { data: [], filtered: [], language: 'en', page: 1, pageSize: 12, sortKey: 'id', sortDirection: 'asc', reviewMap: {} };
const REVIEW_STORAGE_KEY = 'subtitle-atlas-human-reviews-v1';

const translations = {
  en: {
    eyebrow:'TRANSLATION TECHNOLOGY · 2026R1', title:'Subtitle Strategy Atlas', subtitle:'A searchable sample of English–Simplified Chinese film and television subtitles.', navBrowser:'Browser', navReport:'Report', navCodebook:'Codebook', filtersEyebrow:'EXPLORE THE SAMPLE', filtersTitle:'Search and filter', searchLabel:'Keyword', searchPlaceholder:'Search either language…', categoryLabel:'Category', allCategories:'All categories', checkedLabel:'Human checked', allStatuses:'All statuses', checkedYes:'Yes', checkedNo:'No', aiAuditLabel:'AI source audit', allAuditStatuses:'All audit statuses', auditYes:'Exact source row', clearFilters:'Clear filters', filterNote:'Every chart and row below responds to the same filters. Click a term or point to narrow the view and share the URL.', sampleEyebrow:'REPRODUCIBLE SAMPLE', questionTitle:'How does conversational meaning travel across subtitles?', questionBody:'This browser follows 500 pairs sampled from OPUS OpenSubtitles v2024. The working labels remain provisional until the pilot and human checks are complete.', sampledPairs:'sampled pairs', provenanceSource:'SOURCE', provenanceSeed:'SEED', provenanceReview:'REVIEW STATUS', provenanceStatus:'AI reviewed · human check pending', auditExact:'source pairs reproduced exactly', auditMismatch:'text mismatches found', auditFlags:'pairs flagged for short target text', viz1Eyebrow:'VIEW 01 · DISTRIBUTION', viz1Title:'Coding status by strategy', viz1Desc:'Which translation strategies are most visible in the current sample?', viz2Eyebrow:'VIEW 02 · DISTRIBUTION', viz2Title:'Length relationship', viz2Desc:'Do longer English segments tend to produce longer Chinese segments?', viz3Eyebrow:'VIEW 03 · LEXICAL', viz3Title:'Clickable English terms', viz3Desc:'Which recurring words create useful entry points into the corpus?', tableEyebrow:'CORPUS TABLE', tableTitle:'Aligned subtitle pairs', results:'results', downloadCsv:'Download CSV', thId:'ID', thSource:'English source', thTarget:'Chinese target', thCategory:'Category', thChecked:'Human checked', thAudit:'AI audit', loading:'Loading corpus…', page:'Page', of:'of', reportEyebrow:'LEARNING REPORT', reportTitle:'From sampled lines to a translation argument', readFullReport:'Read the formal learning report', originHeading:'Origin', originText:'This project asks how informal subtitle dialogue is reshaped when it moves from English into Simplified Chinese. The topic was chosen because subtitles expose translation decisions in short, high-pressure units that viewers encounter repeatedly.', methodHeading:'Method', methodText:'The sample comes from OPUS OpenSubtitles v2024. A fixed seed, recorded candidate pool, explicit filters, and preserved source line IDs make the selection reproducible. The codebook is piloted on 30 pairs before the full sample is coded.', analysisHeading:'Analysis', analysisText:'The provisional labels suggest that compression is common, but a length heuristic can confuse subtitle reduction with language-specific density or alignment noise. Each claim is traceable to the same filtered rows shown in the charts and table.', reflectionHeading:'Reflection', reflectionText:'AI completed the extraction, coding, interface construction, and source-line review. The site keeps human_checked as no so the distinction between agent review and personal verification remains visible.', codebookEyebrow:'CODING MANUAL', codebookTitle:'Provisional categories for the pilot', codebookIntro:'These definitions are a working draft. They must be tested on 20–30 pairs and rewritten or revised before the final analysis.', readFullCodebook:'Read the full coding manual', cb1Title:'Close rendering', cb1Text:'The target keeps the main meaning and broadly mirrors the source wording or structure.', cb2Title:'Idiomatic equivalence', cb2Text:'A different phrase preserves a conversational function, idiom, or natural response.', cb3Title:'Explicitation', cb3Text:'The target makes an implicit relation or cue more explicit, or adds identifiable information.', cb4Title:'Omission or compression', cb4Text:'Source material is left out or noticeably compressed for subtitle timing or readability.', cb5Title:'Register or intensity shift', cb5Text:'The target changes formality, politeness, emotional force, or vulgarity.', cb6Title:'Unclear alignment', cb6Text:'The pair is too incomplete, noisy, or misaligned for a defensible strategy label.', footerNote:'Course project · labels and verification status are provisional until the student review is complete.', previousPage:'Previous page', nextPage:'Next page', chartHelp1:'Counts currently filtered rows by category', chartHelp2:'Compares source and target character counts', chartHelp3:'Click a term to search the corpus', noRows:'No rows match the current filters.', noTerms:'No terms match the current filters.', matches:'matches', axisX:'English length', axisY:'Chinese length', categoryLabels:{'close rendering':'Close rendering','idiomatic or pragmatic equivalence':'Idiomatic or pragmatic equivalence','explicitation or addition':'Explicitation or addition','omission or compression':'Omission or compression','register or intensity shift':'Register or intensity shift','unclear or alignment-limited':'Unclear or alignment-limited','pending student coding':'Pending student coding'}
  },
  zh: {
    eyebrow:'翻译技术 · 2026R1', title:'字幕翻译策略图谱', subtitle:'一个可搜索的英中影视字幕翻译样本库。', navBrowser:'语料浏览', navReport:'学习报告', navCodebook:'编码手册', filtersEyebrow:'探索样本', filtersTitle:'搜索与筛选', searchLabel:'关键词', searchPlaceholder:'搜索英文或中文…', categoryLabel:'类别', allCategories:'全部类别', checkedLabel:'人工核验', allStatuses:'全部状态', checkedYes:'已核验', checkedNo:'未核验', aiAuditLabel:'AI 来源审计', allAuditStatuses:'全部状态', auditYes:'来源行一致', unitLabel:'单位', allUnits:'全部单位', clearFilters:'重置全部筛选', filterNote:'所有图表和表格会同步响应筛选。点击词语或数据点可进一步筛选。', sampleEyebrow:'可复现样本', questionTitle:'口语意义如何穿过字幕语言的边界？', questionBody:'本页面展示从 OPUS OpenSubtitles v2024 抽取的 500 条句对。当前标签为暂定状态。', sampledPairs:'条样本句对', provenanceSource:'数据来源', provenanceSeed:'抽样种子', provenanceReview:'核验状态', provenanceStatus:'AI 已检查 · 待人工核验', auditExact:'条句对与来源完全一致', auditMismatch:'条文本不一致', auditFlags:'条目标记为译文明显较短', viz1Eyebrow:'视图 01 · 分布', viz1Title:'不同策略的数量', viz1Desc:'当前筛选样本中，各策略分别有多少条？', viz2Eyebrow:'视图 02 · 长度', viz2Title:'英中字幕长度关系', viz2Desc:'较长的英文片段是否对应较长的中文片段？', viz3Eyebrow:'视图 03 · 词汇', viz3Title:'可点击的英文词语', viz3Desc:'点击高频词可筛选语料。', tableEyebrow:'语料表', tableTitle:'英中对齐字幕句对', results:'条结果', downloadCsv:'下载 CSV', thId:'编号', thSource:'英文原文', thTarget:'中文译文', thCategory:'策略类别', thChecked:'人工核验', thAudit:'AI 来源核对', loading:'正在加载语料…', page:'第', of:'页，共', reportEyebrow:'学习报告', reportTitle:'从样本到翻译分析', readFullReport:'展开正式学习报告', originHeading:'研究起点', originText:'本项目考察影视字幕口语从英文进入简体中文后如何被重新组织。字幕的翻译决策发生在短小且受时间限制的语句中，适合观察口语翻译策略。', methodHeading:'研究方法', methodText:'样本来自 OPUS OpenSubtitles v2024。固定随机种子、候选池、筛选规则和来源行号使抽样可复现。编码手册以 30 条句对进行试标。', analysisHeading:'初步分析', analysisText:'暂定标签显示省略或压缩较多，但长度启发式可能混淆字幕删减、中英文密度差异与对齐噪声。', reflectionHeading:'反思', reflectionText:'AI 完成数据提取、分类、界面搭建和来源行检查。人工核验状态必须由实际使用者点击确认。', codebookEyebrow:'编码手册', codebookTitle:'试标用策略类别', codebookIntro:'以下为工作定义，应先在 20–30 条句对上试标并根据结果修订。', readFullCodebook:'展开完整编码手册', cb1Title:'接近直译', cb1Text:'译文保留主要意义，并大体沿用原文措辞或结构。', cb2Title:'习语或语用对等', cb2Text:'译文采用不同表达，但保留口语功能、习语或自然回应。', cb3Title:'显化或增译', cb3Text:'译文将隐含关系或提示说得更明确，或加入可辨识的信息。', cb4Title:'省略或压缩', cb4Text:'原文内容因字幕时长或阅读限制而被省略或明显压缩。', cb5Title:'语域或语气强度变化', cb5Text:'译文改变正式程度、礼貌程度、情感力度或粗俗程度。', cb6Title:'对齐不清', cb6Text:'句对不完整、有噪声或可能错配，无法可靠判定策略。', footerNote:'课程项目 · 标签和核验状态仍需人工复核。', previousPage:'上一页', nextPage:'下一页', chartHelp1:'统计当前筛选结果中各类别的数量', chartHelp2:'比较英文与中文文本的字符数', chartHelp3:'点击词语即可搜索语料', noRows:'没有符合当前筛选条件的句对。', noTerms:'当前筛选结果中没有可显示的词语。', matches:'条匹配', axisX:'英文长度', axisY:'中文长度', chartHelp1:'统计当前筛选结果中各类别的数量', chartHelp2:'比较英文和中文文本的字符数', chartHelp3:'点击词语即可搜索语料', noRows:'没有符合当前筛选条件的句对。', noTerms:'当前筛选结果中没有可显示的词语。', matches:'条匹配', axisX:'英文长度', axisY:'中文长度', categoryLabels:{'close rendering':'接近直译','idiomatic or pragmatic equivalence':'习语或语用对等','explicitation or addition':'显化或增译','omission or compression':'省略或压缩','register or intensity shift':'语域或强度变化','unclear or alignment-limited':'对齐不清','pending student coding':'待学生编码'}
  }
};

const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const categoryNames = ['close rendering','idiomatic or pragmatic equivalence','explicitation or addition','omission or compression','register or intensity shift','unclear or alignment-limited','pending student coding'];

function applyTranslations() {
  const dict = translations[state.language];
  dict.languageToggle = state.language === 'zh' ? '切换到英文' : '切换到中文';
  dict.provenanceAria = state.language === 'zh' ? '数据来源信息' : 'Dataset provenance';
  dict.auditAria = state.language === 'zh' ? '来源核对摘要' : 'Source audit summary';
  document.documentElement.lang = state.language === 'zh' ? 'zh-Hans' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { if (dict[el.dataset.i18nPlaceholder]) el.placeholder = dict[el.dataset.i18nPlaceholder]; });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { if (dict[el.dataset.i18nTitle]) el.title = dict[el.dataset.i18nTitle]; });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => { if (dict[el.dataset.i18nAriaLabel]) el.setAttribute('aria-label', dict[el.dataset.i18nAriaLabel]); });
  document.title = dict.title;
  document.querySelectorAll('#category option[data-category]').forEach(option => { option.textContent = dict.categoryLabels?.[option.dataset.category] || option.dataset.category; });
  document.querySelectorAll('.help-button').forEach((button, index) => { button.title = dict[`chartHelp${index + 1}`]; });
  document.querySelectorAll('.document-details').forEach(details => { details.dataset.language = state.language; });
  $('#language-toggle').textContent = state.language === 'en' ? '中' : 'EN';
  render();
}

function filteredData() {
  const query = $('#search').value.trim().toLowerCase();
  const category = $('#category').value;
  const checked = $('#checked').value;
  const audit = $('#ai-audit').value;
  const unit = $('#unit').value;
  return state.data.filter(row => (!query || `${row.source_text} ${row.target_text}`.toLowerCase().includes(query)) && (!category || row.category === category) && (!checked || row.human_checked === checked) && (!audit || row.ai_source_checked === audit) && (!unit || row.unit === unit));
}

function updateUrl() {
  const params = new URLSearchParams();
  ['search','category','checked','ai-audit','unit'].forEach(id => { const value = $(`#${id}`).value; if (value) params.set(id, value); });
  history.replaceState({}, '', `${location.pathname}${params.toString() ? `?${params}` : ''}${location.hash || '#browser'}`);
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const left = state.sortKey === 'id' ? Number(a[state.sortKey]) : String(a[state.sortKey] ?? '').toLowerCase();
    const right = state.sortKey === 'id' ? Number(b[state.sortKey]) : String(b[state.sortKey] ?? '').toLowerCase();
    if (left < right) return state.sortDirection === 'asc' ? -1 : 1;
    if (left > right) return state.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

function renderBars(rows) {
  const counts = new Map(); rows.forEach(row => counts.set(row.category, (counts.get(row.category) || 0) + 1));
  const entries = [...counts.entries()].sort((a,b) => b[1]-a[1]); const max = Math.max(1, ...entries.map(entry => entry[1]));
  const dict = translations[state.language];
  $('#category-chart').innerHTML = entries.length ? entries.map(([label,count]) => `<div class="bar-row"><button class="bar-label" data-term="${esc(label)}">${esc(dict.categoryLabels?.[label] || label)}</button><div class="bar-track"><div class="bar-fill" style="width:${(count/max)*100}%"></div></div><span class="bar-value">${count}</span></div>`).join('') : `<p class="empty">${dict.noRows}</p>`;
  $('#category-chart').querySelectorAll('[data-term]').forEach(button => button.addEventListener('click', () => { $('#category').value = button.dataset.term; render(); updateUrl(); }));
}

function renderScatter(rows) {
  const maxX = Math.max(10, ...rows.map(row => row.source_text.length)); const maxY = Math.max(10, ...rows.map(row => row.target_text.length));
  const dots = rows.slice(0, 500).map(row => `<button class="scatter-dot" title="${esc(row.source_text)} → ${esc(row.target_text)}" style="left:${row.source_text.length/maxX*100}%;bottom:${row.target_text.length/maxY*100}%" data-id="${row.id}" aria-label="${esc(row.source_text)}"></button>`).join('');
  const dict = translations[state.language];
  $('#length-chart').innerHTML = `<div class="scatter-wrap"><span class="axis-label axis-y">${dict.axisY}</span>${dots}<span class="axis-label axis-x">${dict.axisX} →</span></div>`;
  $('#length-chart').querySelectorAll('[data-id]').forEach(dot => dot.addEventListener('click', () => {
    const row = state.data.find(item => item.id === dot.dataset.id);
    if (row) { $('#search').value = row.source_text.split(/\s+/)[0]; state.page = 1; render(); updateUrl(); }
  }));
}

function renderTerms(rows) {
  const stop = new Set('the a an and or but to of in on for with is are am i you he she it we they this that was were be have has do did will would can could not no yes my your our their what how why where when from as at by me him her them just so if'.split(' '));
  const counts = new Map(); rows.forEach(row => row.source_text.toLowerCase().match(/[a-z]+(?:['’][a-z]+)*/g)?.forEach(word => { if (word.replace(/['’]/g, '').length >= 3 && !stop.has(word)) counts.set(word, (counts.get(word)||0)+1); }));
  const terms = [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,30); const max = Math.max(1,...terms.map(x=>x[1]));
  const dict = translations[state.language];
  $('#term-cloud').innerHTML = terms.length ? terms.map(([word,count]) => `<button type="button" data-word="${esc(word)}" style="font-size:${12+(count/max)*18}px" title="${count} ${dict.matches}">${esc(word)}</button>`).join('') : `<p class="empty">${dict.noTerms}</p>`;
  $('#term-cloud').querySelectorAll('[data-word]').forEach(button => button.addEventListener('click',()=>{ $('#search').value = button.dataset.word; render(); updateUrl(); }));
}

function renderTable(rows) {
  const sorted = sortRows(rows);
  const totalPages = Math.max(1, Math.ceil(sorted.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * state.pageSize;
  const visible = sorted.slice(start, start + state.pageSize);
  const dict = translations[state.language];
  $('#corpus-body').innerHTML = visible.map(row => {
    const checked = Boolean(state.reviewMap[row.id] ?? (row.human_checked === 'yes'));
    const title = checked ? (state.language === 'zh' ? '取消人工核验' : 'Undo human check') : (state.language === 'zh' ? '标记为已人工核验' : 'Mark as human checked');
    const category = dict.categoryLabels?.[row.category] || row.category;
    const auditStatus = state.language === 'zh' ? ((row.ai_source_checked || 'no') === 'yes' ? '来源一致' : '未核对') : (row.ai_source_checked || 'no');
    return `<tr><td>${esc(row.id)}</td><td>${esc(row.source_text)}</td><td>${esc(row.target_text)}</td><td>${esc(category)}</td><td><button type="button" class="review-toggle ${checked ? 'is-checked' : ''}" data-review-id="${esc(row.id)}" aria-pressed="${checked}" title="${title}">${checked ? '✓ ' + (state.language === 'zh' ? '已核验' : 'Checked') : (state.language === 'zh' ? '标记核验' : 'Mark checked')}</button></td><td><span class="status status-yes">${esc(auditStatus)}</span></td></tr>`;
  }).join('') || `<tr><td colspan="6" class="empty">${translations[state.language].noRows}</td></tr>`;
  $('#corpus-body').querySelectorAll('[data-review-id]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.reviewId;
    state.reviewMap[id] = button.getAttribute('aria-pressed') !== 'true';
    try { localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(state.reviewMap)); } catch (error) { console.warn('Review state could not be saved locally.', error); }
    render();
  }));
  $('#page-status').textContent = `${dict.page} ${state.page} ${dict.of} ${totalPages}`;
  $('#previous-page').disabled = state.page <= 1;
  $('#next-page').disabled = state.page >= totalPages;
}

function render() {
  state.filtered = filteredData(); $('#result-count').textContent = state.filtered.length; $('#total-count').textContent = state.data.length; renderBars(state.filtered); renderScatter(state.filtered); renderTerms(state.filtered); renderTable(state.filtered);
}

function downloadCsv() { const columns = ['id','source_text','target_text','source','category','human_checked','ai_reviewed','ai_source_checked','ai_alignment_flags','unit','key_term','notes','source_line_id','retrieved_date']; const csv = [columns.join(','), ...state.filtered.map(row => columns.map(key => { const value = key === 'human_checked' ? (state.reviewMap[row.id] ?? (row.human_checked === 'yes' ? 'yes' : 'no')) : row[key]; return `"${String(value ?? '').replaceAll('"','""')}"`; }).join(','))].join('\n'); const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([`\ufeff${csv}`], {type:'text/csv;charset=utf-8'})); link.download = 'subtitle-strategy-reviewed.csv'; link.click(); URL.revokeObjectURL(link.href); }

async function init() {
  state.data = window.CORPUS_DATA || [];
  try { state.reviewMap = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || '{}'); } catch { state.reviewMap = {}; }
  const categories = [...new Set(state.data.map(row=>row.category))].sort(); categories.forEach(value => $('#category').insertAdjacentHTML('beforeend', `<option value="${esc(value)}" data-category="${esc(value)}">${esc(translations[state.language].categoryLabels?.[value] || value)}</option>`));
  const units = [...new Set(state.data.map(row=>row.unit))].sort(); units.forEach(value => $('#unit').insertAdjacentHTML('beforeend', `<option value="${esc(value)}">${esc(value)}</option>`));
  const params = new URLSearchParams(location.search); ['search','category','checked','ai-audit','unit'].forEach(id => { if (params.has(id)) $(`#${id}`).value = params.get(id); });
  ['search','category','checked','ai-audit','unit'].forEach(id => $(`#${id}`).addEventListener(id === 'search' ? 'input' : 'change', () => { state.page = 1; render(); updateUrl(); }));
  document.querySelectorAll('.sort-button').forEach(button => button.addEventListener('click', () => { const key = button.dataset.sort; state.sortDirection = state.sortKey === key && state.sortDirection === 'asc' ? 'desc' : 'asc'; state.sortKey = key; render(); }));
  $('#previous-page').addEventListener('click', () => { state.page -= 1; render(); });
  $('#next-page').addEventListener('click', () => { state.page += 1; render(); });
  $('#clear-filters').addEventListener('click',()=>{ ['search','category','checked','ai-audit','unit'].forEach(id=>{ $(`#${id}`).value=''; }); state.page = 1; history.replaceState({}, '', `${location.pathname}${location.hash || '#browser'}`); render(); }); $('#download-csv').addEventListener('click',downloadCsv); $('#language-toggle').addEventListener('click',()=>{ state.language = state.language === 'en' ? 'zh' : 'en'; applyTranslations(); }); applyTranslations();
}

init().catch(error => { console.error(error); $('#corpus-body').innerHTML = '<tr><td colspan="5" class="empty">Corpus data could not be loaded.</td></tr>'; });
