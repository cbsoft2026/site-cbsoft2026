#### Introduction

CBSoft 2026 will consolidate Artifact Evaluation and the assignment of badges for papers that provide artifacts. As in 2025, the PDFs of papers with successfully evaluated artifacts will receive badges as an official part of CBSoft publication. The goal of the Artifacts Festival is to:

1. Promote Open Science in Software Engineering research;

2. Reward authors of papers who share their artifacts;

3. Help readers identify papers with available and functional artifacts.

Papers with badges include reusable artifacts, promoting transparency and enabling other researchers to replicate the study, validate its findings, and build upon the research through reuse. Papers with badges also have greater prestige within the research community.

Authors of papers accepted to SBES (any track), SAST, SBCARS, and SBLP 2026 may submit the artifacts associated with these papers for evaluation.

#### Types of Artifacts

**Artifact** is an umbrella term that encompasses various types of materials and products. It includes everything from basic materials, such as interview questionnaires, to more complex products, such as fully automated tools. Any artifacts that may be useful for future research projects are welcome.

Artifacts of interest include, but are not limited to:

- **Data repositories**, containing data used in or produced by the study;
- **Tools and frameworks**, which are implementations of systems and services that can be used and potentially extended;
- **Qualitative artifacts**, such as interview scripts and survey templates. Interview transcripts and survey results are also very valuable, provided that authors can share them (for example, interviews may contain sensitive information about a company);
- **Software engineering-specific machine learning models**, for example, pre-trained models that can be used to solve problems in the field;
- **Replication packages**, which may be a combination of the items above depending on the type of research, and which help other researchers replicate the study presented in the accepted paper.

#### Artifact Badging

Artifacts may be considered **Available** or **Functional**, resulting in the assignment of the respective artifact badges (see below). These badges are **independent of each other** and can be applied to any paper.

<img src="/2026/images/artifacts/artifacts_available.png" width="300"><br/>

A paper will be awarded the "**Available**" badge if the following criteria are met:

- The artifact is **relevant to the paper**;
- The artifact is **deposited in a publicly accessible archival repository**, and a **DOI or link to this persistent repository** is provided (see Submission Instructions);
- The artifact is **properly documented**, with a `README` file explaining, at a minimum, the **contents of the repository**.

<img src="/2026/images/artifacts/artifacts_functional.png" width="300"><br/>

A paper will be awarded the "**Functional**" badge if the following criteria are met:

- The artifact is **relevant to the paper**;
- The artifact is **properly documented**, with a `README` file that provides sufficient description to enable the artifact to be used;
- The artifact is **complete** (including all data and components) for **full execution**;
- The artifact is **executable**, meaning that other researchers can successfully run it.

If the **Artifact Evaluation Committee** accepts a submitted artifact:

- The **first page of the paper** will be marked with the awarded **badge(s)**;
- The paper will be **labeled with the badge(s)** in the **list of accepted papers** on the respective symposium website and in the **CBSoft 2026 program;**
- Authors of selected artifacts will be **invited to present their artifacts in a special session during CBSoft 2026**;
- The artifact will **compete for the Best Artifact Award**, which will be presented at the **opening of CBSoft 2026**, recognizing the authors' efforts in creating and sharing **outstanding research artifacts**.

#### Submission Instructions and Important Dates

Only authors of papers **accepted for publication** may submit **Artifacts**. The submission and evaluation of Artifacts will take place according to the **timeline of each symposium and track of CBSoft 2026**. Submission will occur in the period between the **acceptance notification** and the **camera-ready submission deadline** for the respective symposium or track. Authors who wish to submit their Artifacts for evaluation must use the **dedicated [JEMS3](https://jems3.sbc.org.br/artifacts2026/) page for Artifact submission**.

Consider the **SBES 2026 Research Track**, for example. The notification will be sent to authors on July 3, 2026, and the camera-ready submission deadline will be July 17, 2026. This same interval will be used for authors of accepted papers in the SBES 2026 Research Track to submit their artifacts for evaluation. The same applies to all other symposia and tracks of CBSoft 2026. If an artifact associated with a paper is submitted **outside the time window of its respective symposium or track**, it will be **automatically rejected**.

##### Step 1. Preparing and Documenting the Artifact

Artifacts (i.e., their contents) must be **self-contained**. All instructions about the artifacts (how they are organized, how to use them, etc.) must be included within the artifact itself. People beyond the **Artifact Evaluation Committee** must be able to use these artifacts.

The contents of an artifact must include both the **artifact files** and the **documentation describing them**. Below, authors can see the expected structure. Artifacts whose contents do not follow the expected structure will be **automatically rejected**.

```
├─ <artifact folders and files>
├─ LICENSE
└─ README
```

> Note: The expected structure assumes that the content above is placed **directly at the root of the repository**. Do not create any additional folders or subfolders above the `LICENSE` and `README` files.

The `LICENSE` file must describe the **distribution rights**. Note that, to receive the "**Available**" badge, the license must be an **open-source license** for code or a **permissive license** (e.g., a **Creative Commons license**) for other types of artifacts.

The `LICENSE` file is **mandatory**, even if the license is already displayed on the repository's description page. The license specified in the `LICENSE` file must be the same as the one shown on the repository page.

The `README` file is the document that anyone will consult when accessing the artifact repository. The `README` file is **mandatory**, even if its content duplicates what is shown on the repository's description page.

The `README` content must include the following required items:

- The `README` must **describe the artifact** and explain how the content is organized. This is the minimum information needed to encourage others to use the artifact.
- The `README` must include a **link to the accepted paper**. The paper PDF may be hosted within the artifact repository or on an external service (e.g., **ArXiv**).
- For **data-focused artifacts**, the `README` must address **storage requirements** and **ethical and legal statements**, when relevant.
- For **code-focused artifacts**, the `README` must cover aspects related to **installation and execution**. It must include two specific sections: **Requirements** and **Installation**.

The **Requirements** section must describe the requirements to execute the software system. Basic requirements, such as the **Java version**, should be specified. A `requirements.txt` file with explicit versioning information (e.g., for Python-only environments) should be provided when relevant. To ensure completeness and full functionality, the Requirements section should also address **hardware requirements** (e.g., performance, storage, or non-standard peripherals) and **software environments** (e.g., Docker, virtual machines, and operating system).

The **Installation** section must include instructions that illustrate a **basic usage example** or a **method to test the installation**. This may include, for example, the expected output that confirms the code has been properly installed and is working.

As a general rule, authors should provide **sufficient instructions, code, and data** so that a person in **Computer Science**, with reasonable knowledge of **scripting, build tools, etc.**, can **install, build, and run the code**.

##### Step 2. Making the Artifact Available for Evaluation

###### For the "Available" badge:​

Authors must make the artifact **publicly available** to the Evaluation Committee (and potential users). The artifact must be placed in a **publicly accessible archival repository** that provides a DOI.

Note that links to **personal websites, temporary storage services** (e.g., Google Drive), and **GitHub** are considered **non-persistent**. Therefore, artifacts hosted in such locations will be **automatically rejected**. Examples of **persistent repositories** that provide DOIs include **Zenodo**, **Figshare**, and the **Open Science Framework**.

###### For the "Functional" badge:​

Artifacts do **not necessarily need to be publicly available** or hosted in publicly accessible archival repositories (with DOI) if the goal is only to obtain the "**Functional**" badge. This applies to artifacts that authors intend to **share upon request**. In such cases, for the evaluation process, authors must provide a **private link** or a **password-protected link**.

##### Step 3. Submitting the Artifact

For the **Artifacts Festival 2026**, submission will take place alongside the preparation of the **camera-ready version** of the paper accepted for publication at CBSoft 2026. In other words, the **camera-ready submission deadline will be the same as the Artifact Festival submission deadline** for the respective track. Authors must use the **CBSoft 26 camera-ready template** ([Overleaf](https://www.overleaf.com/project/69320bdf1918ba90eb56e9f3), [ZIP](https://cbsoft.sbc.org.br/2026/Template_para_eventos_do_CBSoft.zip)), as it already includes a dedicated section for the Artifacts Festival in the required format.

To submit a paper to the **Artifacts Festival 2026**, the camera-ready version must include a section titled **Artifact Availability**. This section must be placed **immediately after the Conclusion and before the Acknowledgments section**. It must not be numbered and must be titled exactly **Artifact Availability**. The section must describe:

- **what is being made available**;
- **the access link**, in the case of public artifacts, or the official method readers should use to obtain access, in the case of artifacts shared upon request;
- **the type of license and usage conditions**, when applicable.

Artifact submissions whose camera-ready version does not include the **Artifact Availability** section as described above will be **automatically rejected**.

The **main link** must direct readers to a **specific version of the artifact**. For example, if you submitted your artifacts to **Zenodo**, you must provide a link to the exact final version with updates, rather than a general link to "all versions." Additional relevant links (such as a GitHub repository or a tool demonstration video) may be included after the main link declaration.

> Important: If, during the preparation of the camera-ready PDF, you publish a new version of the artifact with updates in the repository (e.g., in response to reviewer comments or to comply with the festival chairs' checklist), the main repository link declared in the Artifact Availability section must be updated accordingly.

Artifacts must be submitted electronically through the [JEMS3](https://jems3.sbc.org.br/artifacts2026/). Authors must provide the following information:

- **Title and authors of the accepted paper**;
- **Identifier of the accepted paper** in its symposium and/or track;
- **Badges**: the claimed badge(s), i.e., "**Available**" and/or "**Functional**", along with a brief explanation of why the artifact qualifies for the respective badge(s);
- **PDF file of the camera-ready version** of the accepted paper.

#### Organization

##### Program Committee Co-Chairs​

Matheus Paixão, Universidade Estadual do Ceará (UECE)​

Daniel Lucrédio, Universidade Federal de São Carlos (UFSCar)

##### Program Committee​

*To be defined.*