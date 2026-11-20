# EcoGEO: Trajectory-Aware Evidence Ecosystems for Web-Enabled LLM Search Agents

<div align="center">
  <a href="https://yehengwei.com/EcoGEO/"><img src="https://img.shields.io/badge/%F0%9F%8C%90%20Homepage-00A3FF" alt="Homepage"></a>
  <a href="https://arxiv.org/abs/2605.12887"><img src="https://img.shields.io/badge/%F0%9F%93%96%20arXiv-C71585" alt="Paper on arXiv"></a>
  <a href="https://huggingface.co/datasets/BoBo-Ye/OPR-Bench"><img src="https://img.shields.io/badge/%F0%9F%93%8A%20Dataset-OPR--Bench-237F75" alt="OPR-Bench on Hugging Face"></a>
  <a href="https://github.com/BoBo-Ye/EcoGEO/stargazers"><img src="https://img.shields.io/github/stars/BoBo-Ye/EcoGEO" alt="GitHub stars"></a>
</div>
<p align="center">
  <img src="static/images/geo-comparison.png" alt="Page-level GEO improves the content of an individual product page" width="44%">
  <img src="static/images/geo-to-ecogeo-arrow.svg" alt="From GEO to EcoGEO" width="6%">
  <img src="static/images/ecogeo-comparison.png" alt="EcoGEO coordinates product evidence across official, review, expert, news, forum, and social pages" width="44%">
</p>
<p align="center"><b>From individual content optimization (GEO) to coordinated evidence ecosystems (EcoGEO).</b></p>

**Generative Engine Optimization (GEO)** aims to make webpages more visible in AI-powered search. Most existing methods focus on rewriting individual pages to make their contents more informative, while **EcoGEO** organizes multiple pages into an **Evidence Ecosystem**, where agents can encounter mutually supporting information along their search trajectories.

## News

- **[2026.09.25]** EcoGEO has been accepted as a poster at **[NeurIPS 2026](https://neurips.cc/virtual/2026/loc/sydney/poster/153813)**. 🎉
- **[2026.11.19]** OPR-Bench is now available on **[Hugging Face](https://huggingface.co/datasets/BoBo-Ye/OPR-Bench)**.

## Dataset

The dataset contains **3,124 query–product pairs** and **21,868 page records**. Each instance pairs an recommendation user query with a fictional target product and seven supporting page bodies. All target products are synthetic and used only in a controlled environment alongside live-web distractors. **For safety reasons, we will release the dataset but will not make the full experimental code publicly available.**

## Citation

```bibtex
@inproceedings{ye2026ecogeo,
  title={EcoGEO: Trajectory-Aware Evidence Ecosystems for Web-Enabled LLM Search Agents},
  author={Hengwei Ye and Jiasheng Mao and Zhenhan Guan and Zheng Tian},
  booktitle={The Fortieth Annual Conference on Neural Information Processing Systems},
  year={2026},
  url={https://openreview.net/forum?id=IWhjevkPn4}
}
```
