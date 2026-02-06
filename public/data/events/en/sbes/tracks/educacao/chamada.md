The Brazilian Symposium on Software Engineering (SBES) is the leading Software Engineering event in Latin America. SBES is held jointly with CBSoft, the Brazilian Conference on Software: Theory and Practice, which traditionally brings together academics, professionals, and students.

The SBES Education Track, formerly known as FEES (Forum on Software Engineering Education), focuses on discussing challenges, best practices, and innovations in Software Engineering education and training.

The Software Engineering Education Track seeks quality submissions that deal with subjects related to curriculum development, institutional or personal experience reports, experimental studies, best practices, and theoretical or conceptual works within the scope of Education and Training in Software Engineering. Contributions may address different levels and contexts, including, but not limited to, primary and secondary education, technological education, university education at undergraduate and graduate levels, coding clubs, hackathons, bootcamps, industrial training, and informal learning and training.

#### Paper Categories
The SBES Education track invites researchers and educators in the area to submit papers in the categories below:

* **Research Papers** - A research paper must address a topic related to software engineering and education using appropriate research techniques and proper scholarly writing. Within the context of the topics of interest for this call for papers, papers in this category must follow rigorous standards, describing research questions, hypotheses, methods, results, and limitations, as is typical and expected of research studies. Therefore, papers such as controlled experiments, surveys, qualitative studies, case studies are expected. Negative and mixed findings are acceptable.
* **Experience Reports** - Papers must describe the use of an intervention, course or education/training experience in Software Engineering, detailing the theoretical bases of the approach, the context of use and providing a rich reflection on what worked or did not work and why what, but the paper does not need to evaluate the experience or use rigorous research methods to support its claims. It is essential that papers in this category bring enough detail to allow the approach presented to be replicated by other professors. Negative and mixed findings are acceptable provided they can support advice or lessons learned.
* **Replication Paper** - A replication paper describes the repetition of an existing and already published pedagogical intervention (e.g. course, approach, study, education, training experience) in new contexts. The goal is to determine if the basic findings related to the original pedagogical intervention can be applied to other circumstances. Negative and mixed findings are acceptable provided they can support advice or lessons learned.

#### Important Dates

| | |
|---|---|
| Paper registration (abstract submission) | {paper_registration} **(HARD DEADLINE)** |
| Paper submission | {submission_date} **(HARD DEADLINE)** |
| 1st Notification of Acceptance | {first_notification_acceptance} |
| Rebuttal period | June 22 to June 29, 2026 |
| Final Notification of Acceptance | {second_notification_acceptance} |
| Camera-ready submission | {camera_ready} |

#### Topics of Interest

We invite submissions on education and training Software Engineering in a variety of settings (e.g., classroom, further training course, university education, technical education), including, but not limited to, the topics listed below:

* On-site, Hybrid, or Remote education and training of Software Engineering after the COVID-19 pandemic, highlighting changes in the teaching-learning process;
* Education and Training Software Engineering through active learning methodologies: Problem-based Learning, Project-based Learning, Challenge-based Learning, Flipped Classroom, among others;
* Good practices and innovative practices for education and training Software Engineering;
* Curriculum or innovative course projects;
* Education and training Software Engineering in the context of different undergraduate and graduate courses;
* Education and training methods, techniques, and tools for software development;
* Education and training Software Engineering in informal environments, such as hackathons and Stack overflow;
* Emerging educational environments for Software Engineering, such as online learning;
* Teaching/learning experiences using approaches in practical Software Engineering scenarios, such as: agile methods, open source, distributed software development, cloud computing, big data, mobile devices, embedded systems, robotics, machine learning and others;
* Tools and methods for evaluating Software Engineering learning;
* Teaching/learning of human, political, ethical, legal, professional, and social aspects in Software Engineering;
* Integration of practical experiences in Software Engineering education and training;
* Integration between research and education of Software Engineering;
* Interdisciplinarity in Software Engineering Education and Training;
* Innovative methods that promote study and encourage instructors´' learning, keeping them updated for education and training Software Engineering;
* Education and training in Software Engineering that encourages entrepreneurship, especially the creation of startups;
* Research on equality, diversity, and inclusion in Software Engineering education and training;
* Open source in Software Engineering education and training;
* Education and training of emerging topics in Software Engineering.

#### Open Science Policies

SBES 2026 encourages authors to adopt Open Science principles and practices to promote transparency, replicability, and reproducibility in research. We encourage all contributing authors to disclose anonymized and curated data or artifacts to enhance reproducibility and replicability. We recognize that reproducibility or replicability is not an objective in qualitative research and that, as in industrial studies, qualitative studies often face challenges when sharing research data.

In this context, following international events in the field, submissions to the Education Track must include an unnumbered section titled "Artifact Availability" after the "Conclusion" section and must:

* make their artifact or artifacts available to the Program Committee (via upload of supplementary material or a link to an anonymous repository) and provide instructions in the paper on how to access these data, or
* include an explicit statement in the paper explaining why this is not possible or desirable, and
* indicate why they do not intend to make their data or study materials publicly available after acceptance, if applicable. The default expectation is that data or other artifacts will be made publicly available after a paper is accepted.

The document [SBES 2026 – Open Science Policies](https://drive.google.com/file/d/1xI6iPLxaX-fvgy334fVw_cUixnBK-DRx/view?usp=share_link) presents Open Science principles and practices to support authors submitting to the SBES Education Track. During paper preparation, any questions may be directed to the SBES 2026 Open Science Chairs without compromising the anonymity of the submission.

#### About the use of AI (Artificial Intelligence) or AI-assisted technologies in submitted work

By submitting work to SBES 2026 - Education Track, the authors acknowledge that they comply with the Generative AI usage policy based on existing policies proposed by IEEE, ACM, and Springer.

It is forbidden:

* List Generative AI tools and technologies, such as ChatGPT, as paper authors.
* Use texts or sections entirely produced by generative AI tools.

It is allowed (with explicit mention in the acknowledgments):

* Use generative AI tools to create parts of the content, with mention in the paper acknowledgments indicating what was generated and which tool was used. It is essential to check the terms of use of the tool, which is the responsibility of the paper's authors. For example, in the acknowledgments: ChatGPT was used to generate the first paragraph of Section 3 and Table 3.2.

It is allowed (no need to mention):

* Use AI or AI-assisted technologies to improve the quality of images in terms of contrast and clarity;
* Utilize generative AI tools to edit and improve the quality of your existing text (similar to an assistant like Grammarly to improve spelling, grammar, punctuation, clarity, and engagement).

#### Paper Preparation and Submission

Papers can be written in Portuguese or English. Submitted papers must not have been simultaneously submitted to any other forum (conference or journal), nor must they have been published elsewhere. Submissions in English are strongly encouraged, as the symposium proceedings will be indexed in a digital library. Papers written in Portuguese must include an abstract in English.

In the case of an experience report or replication paper, we suggest highlighting the paper category in some parts of the submission, such as the subtitle, abstract, and others.  

Papers must be submitted in Adobe Portable Document Format (PDF) and strictly follow the 2-column ACM_SigConf format available at: https://www.acm.org/publications/proceedings-template. LaTeX users should use the `acmart.cls` class provided in the template, with conference format enabled in the preamble of the document:

```latex
\documentclass[sigconf,anonymous]{acmart}
```

In addition, it will be necessary to remove certain sections from the standard ACM template. To do so, use the following commands:

```latex
\setcopyright{none}
\settopmatter{printccs=false}
\settopmatter{printacmref=false}
\renewcommand\footnotetextcopyrightpermission[1]{} 
```

The bibliography style provided in the `ACM-Reference-Format.bst` template should be used:

```latex
\bibliographystyle{ACM-Reference-Format}
```

After the Conclusion section, you should include an unnumbered section called "Artifact Availability":

```latex
\section*{Disponibilidade de Artefatos}
```

Papers must have a maximum of 10 pages, including figures, tables and acknowledgments, plus up to 2 pages for references. Papers must be registered and submitted through the [sistema JEMS 3](https://jems3.sbc.org.br/events/485).

* Paper registration: The title, authors, abstract, topics of interest, and language of the paper must be informed.
* Submission of the complete paper: You must submit the file in PDF format containing the paper.

The publication of accepted papers in the Education Track requires that at least one author be registered for CBSoft 2026 (according to the registration rules established by the local organizing committee) and that the paper be presented in person during SBES 2026. Papers that are not presented will not be included in the SBES 2026 proceedings.

#### Anonymization

The SBES 2026 Education Track adopts a double-anonymous review process. All submitted papers should conceal the identity of the authors. Both author names and affiliations must be omitted. In addition, the following rules should be addressed:

* Citations to own related work must be written in the third person. For example, one must write "the previous work of Silva et al." as opposed to "our previous work." Terms that can identify the authors, for instance, "we", "our", "ours", "GitHub", and "funding", must be avoided and should be removed before submitting.
* Papers should not mention any artifact in repositories or websites that can identify the authorship. If any artifact needs to be made available, it should be anonymized in the repository/website. For using GitHub, we recommend the "anonymous" service (https://anonymous.4open.science);
* If the submitted paper is a follow-up of a previous work, the reference may be anonymized in the submitted paper. For example, "the previous work of Silva et al." can be adapted to "based on the previous work [X]" and the reference at the end of the paper can be presented as "[X] Anonymous authors. Not presented due to double-blind review.";
* Reviewers will not be encouraged to look for references in other sources on the Internet that identify the authors. Searches in digital libraries or existing artifacts do not break the double-blind policy.

After paper acceptance, all the paper information (without anonymization) can be included in the camera-ready version. Any questions about paper preparation following the double-blind rules can be sent to the Program Committee Chairs.

Any questions about paper preparation following the double-blind rules can be sent to the Program Committee Chairs.

#### Desk Rejection

Submissions that are out of the scope of SBES 2026 Education Track, or not in compliance with the required submission format and anonymization rules, will be rejected without review.

If a previous publication of the paper or simultaneous submission for a refereed venue (event or journal) is reported, the paper will be rejected and authors may be prevented from submitting papers in future SBES editions. Still, the organizers of the other venue will be communicated about the event.

If evidence is found that generative AI tools were used in the submission in ways that do not comply with the guidelines for the use of generative AI in this call, the paper will be rejected without review, and the authors may be prevented from submitting papers in future SBES editions.

#### Evaluation Criteria

Submissions will be evaluated based on their category:
* **Research Papers** will be evaluated against these criteria: **Relevance, Significance, Soundness, Verifiability, Presentation**;
* **Experience Reports** will be evaluated against these criteria: **Relevance, Significance, Actionability, Lessons, Presentation**;
* **Replication Papers** will be evaluated against these criteria: **Relevance, Significance, Soundness, Presentation**.

The evaluation criteria for SBES Education track papers are defined as follows:

* **Relevance:** The extent to which the paper is relevant to SBES Education track to enhance the body of knowledge on challenges, good practices, experiences, and innovations in Software Engineering education and training.
* **Significance:** The extent to which the paper is well-motivated and its contributions are original or important, with respect to the existing literature on software engineering education and training.
* **Soundness:** The extent to which the paper’s contributions are supported by rigorous application of appropriate research methods and whether the paper discusses meaningfully the research methods’ limitations and threats to the validity of the findings.
* **Verifiability:** The extent to which the paper includes sufficient information to support independent verification or replication of the paper’s claimed contributions. This includes public availability of research data or an explicit statement why such data cannot be made publicly available.
* **Actionability:** The extent to which the paper provides actionable advice with clear take-away messages.
* **Lessons:** The extent to which the paper meaningfully discusses lessons learned in terms of what went right, what went wrong, and what could be improved if the experience is repeated.
* **Presentation:** The extent to which the paper’s organization and quality of writing is up to the standard: the paper is well-structured, employs clear and correct scholarly language, avoids ambiguity, includes clearly readable figures and tables, and is appropriately formatted.

#### Authors' Response (Rebuttal)

The authors will have access to the reviews and will be able to argue and respond to the questions indicated before the final decision of acceptance or rejection. The rebuttal is limited to plain text up to 7,000 characters (including spaces).

In case of questions, please approach the Program Committee Co-Chairs via e-mail at any time.

#### Early Decisions

To reduce the effort of authors and reviewers from unnecessary writing/reading of author responses, SBES 2026will be sending early decisions.

When reviewers and PC chairs decide that a paper can be accepted in its current state without asking questions, authors will receive an 'Accepted' decision at the beginning of the rebuttal period (first notification). In that case, they will not need to submit a response.

On the other hand, if the reviewers feel that the paper is highly deficient, leading them to conclude that the authors' response is unlikely to change the review, or if the paper requires a complete redesign, the authors will receive a 'Rejected' decision in the start of the rebuttal period (first notification) and will not be asked to submit a response.

All other papers will receive a 'Recommended Response' notification at the beginning of the rebuttal period. In any case, as is usual, it is still up to the authors to decide whether they want to send a response or not.

#### Best Paper Award

The SBES Steering Committee will appoint a committee to award the best works of the symposium. Education Track award-winning work will be announced during the event, and will be invited to submit an extended English version to the Journal of Software Engineering Research and Development (JSERD). The track chairs reserve the right to nominate for award only suitable work, including the possibility of not having work nominated for award in this track.

#### Outstanding Reviewer Award

SBES 2026 Education Track recognizes the generosity of reviewers who dedicate their time and best effort to reviewing submitted papers. Scientific growth progress depends on dedicated colleagues who aim to further the development of technology, offering their attention and passion when reviewing papers. The Best Reviewer certificate will be awarded to reviewers who submit excellent quality reviews to SBES. Evaluation will be based on the technical quality, usefulness, and punctuality of the reviews, as well as adherence of reviews to the track review criteria and participation during the Program Committee discussion.

#### Organization

###### Program Committee Coordinators - Education Track

Awdren Fontão (UFMS)

Carla Bezerra (UFC)

###### Program Committee

*in formation*

<br/>

> Education Track