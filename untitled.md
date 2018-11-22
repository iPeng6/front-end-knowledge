# Untitled

## The TC39 Process

The Ecma [TC39](https://www.ecma-international.org/memento/tc39.htm) committee is responsible for evolving the ECMAScript programming language and authoring the specification. The committee operates by consensus and has discretion to alter the specification as it sees fit. However, the general process for making changes to the specification is as follows.

### Development

Changes to the language are developed by way of a process which provides guidelines for evolving an addition from an idea to a fully specified feature, complete with acceptance tests and multiple implementations. There are five stages: a strawman stage, and 4 “maturity” stages. The TC39 committee must approve acceptance for each stage.

<table>
  <thead>
    <tr>
      <th style="text-align:left">ECMAScript Proposal Stages</th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
      <th style="text-align:left"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">Stage</td>
      <td style="text-align:left">Purpose</td>
      <td style="text-align:left">Entrance Criteria</td>
      <td style="text-align:left">Acceptance Signifies</td>
      <td style="text-align:left">Spec Quality</td>
      <td style="text-align:left">Post-Acceptance Changes Expected</td>
      <td style="text-align:left">Implementation Types Expected*</td>
    </tr>
    <tr>
      <td style="text-align:left">0</td>
      <td style="text-align:left">Strawman</td>
      <td style="text-align:left">Allow input into the specification</td>
      <td style="text-align:left">None</td>
      <td style="text-align:left">N/A</td>
      <td style="text-align:left">N/A</td>
      <td style="text-align:left">N/A</td>
      <td style="text-align:left">N/A</td>
    </tr>
    <tr>
      <td style="text-align:left">1</td>
      <td style="text-align:left">Proposal</td>
      <td style="text-align:left">
        <ul>
          <li>Make the case for the addition</li>
          <li>Describe the shape of a solution</li>
          <li>Identify potential challenges</li>
        </ul>
      </td>
      <td style="text-align:left">
        <ul>
          <li>Identified “champion” who will advance the addition</li>
          <li>Prose outlining the problem or need and the general shape of a solution</li>
          <li>Illustrative examples of usage</li>
          <li>High-level API</li>
          <li>Discussion of key algorithms, abstractions and semantics</li>
          <li>Identification of potential “cross-cutting” concerns and implementation
            challenges/complexity</li>
        </ul>
      </td>
      <td style="text-align:left">The committee expects to devote time to examining the problem space, solutions
        and cross-cutting concerns</td>
      <td style="text-align:left">None</td>
      <td style="text-align:left">Major</td>
      <td style="text-align:left">Polyfills / demos</td>
    </tr>
    <tr>
      <td style="text-align:left">2</td>
      <td style="text-align:left">Draft</td>
      <td style="text-align:left">Precisely describe the syntax and semantics using formal spec language</td>
      <td
      style="text-align:left">
        <ul>
          <li>Above</li>
          <li>Initial spec text</li>
        </ul>
        </td>
        <td style="text-align:left">The committee expects the feature to be developed and eventually included
          in the standard</td>
        <td style="text-align:left">Draft: all <em>major</em> semantics, syntax and API are covered, but TODOs,
          placeholders and editorial issues are expected</td>
        <td style="text-align:left">Incremental</td>
        <td style="text-align:left">Experimental</td>
    </tr>
    <tr>
      <td style="text-align:left">3</td>
      <td style="text-align:left">Candidate</td>
      <td style="text-align:left">Indicate that further refinement will require feedback from implementations
        and users</td>
      <td style="text-align:left">
        <ul>
          <li>Above</li>
          <li>Complete spec text</li>
          <li>Designated reviewers have signed off on the current spec text</li>
          <li>All ECMAScript editors have signed off on the current spec text</li>
        </ul>
      </td>
      <td style="text-align:left">The solution is complete and no further work is possible without implementation
        experience, significant usage and external feedback.</td>
      <td style="text-align:left">Complete: all semantics, syntax and API are completed described</td>
      <td
      style="text-align:left">Limited: only those deemed critical based on implementation experience</td>
        <td
        style="text-align:left">Spec compliant</td>
    </tr>
    <tr>
      <td style="text-align:left">4</td>
      <td style="text-align:left">Finished</td>
      <td style="text-align:left">Indicate that the addition is ready for inclusion in the formal ECMAScript
        standard</td>
      <td style="text-align:left">
        <ul>
          <li>Above</li>
          <li><a href="https://github.com/tc39/test262">Test262</a> acceptance tests
            have been written for mainline usage scenarios, and merged</li>
          <li>Two compatible implementations which pass the acceptance tests</li>
          <li>Significant in-the-field experience with shipping implementations, such
            as that provided by two independent VMs</li>
          <li>A pull request has been sent to <a href="https://github.com/tc39/ecma262">tc39/ecma262</a> with
            the integrated spec text</li>
          <li>All ECMAScript editors have signed off on the pull request</li>
        </ul>
      </td>
      <td style="text-align:left">The addition will be included in the soonest practical standard revision</td>
      <td
      style="text-align:left">Final: All changes as a result of implementation experience are integrated</td>
        <td
        style="text-align:left">None</td>
          <td style="text-align:left">Shipping</td>
    </tr>
  </tbody>
</table>\* This column does not indicate a requirement for advancement, but simply a general expectation.

### Input into the process

Ideas for evolving the ECMAScript language are accepted in any form. Any discussion, idea or proposal for a change or addition which has not been submitted as a formal proposal is considered to be a “strawman” \(stage 0\) and has no acceptance requirements. Such submissions must either come from members of TC39 or from non-members who have [registered](https://tc39.github.io/agreements/contributor) via Ecma International.

### Spec revisions and scheduling

TC39 intends to submit a specification to the ECMA General Assembly for ratification in July of each year. The following is an approximate timeline for producing a new spec revision:

* February 1: Candidate Draft is produced.
* February - March: 60 day royalty-free opt-out period.
* March TC39 Meeting: stage 4 proposals are incorporated, final semantics are approved, and the new spec version is branched from master. Only editorial changes are accepted from this point forward.
* April-June: ECMA CC and ECMA GA review period.
* July: Approval of new standard by the ECMA General Assembly

### Status of in-process additions

TC39 will maintain a list of in-process additions, along with the current maturity stage of each, [on its GitHub](https://github.com/tc39/ecma262).

### Spec text

At stages “draft” \(stage 2\) and later, the semantics, API and syntax of an addition must be described as edits to the latest published ECMAScript standard, using the same language and conventions. The quality of the spec text expected at each stage is described above.

### Reviewers

Anyone can be a reviewer and submit feedback on an in-process addition. The committee should identify designated reviewers for acceptance during the “draft” \(stage 2\) maturity stage. These reviewers must give their sign-off before a proposal enters the “candidate” \(stage 3\) maturity stage. Designated reviewers should not be authors of the spec text for the addition and should have expertise applicable to the subject matter. Designated reviewers must be chosen by the committee, not by the proposal's champion.

When reviewers are designated, a target meeting for Stage 3 should be identified. Initial reviewer feedback should be given to the champions two weeks before that meeting to allow for a back-and-forth ahead of the meeting. The target Stage 3 meeting may be delayed by a champion outside of the meeting at a later time if it is not ready.

### Calls for implementation and feedback

When an addition is accepted at the “candidate” \(stage 3\) maturity level, the committee is signifying that it believes design work is complete and further refinement will require implementation experience, significant usage and external feedback.

### Test262 tests

During stage 3, [test262](https://github.com/tc39/test262) tests should be authored and submitted via pull request. Once it has been appropriately reviewed, it should be merged to aid implementors in providing the feedback expected during this stage.

### Eliding the process

The committee may elide the process based on the scope of a change under consideration as it sees fit.

### Role of the editors

In-process additions will likely have spec text which is authored by a champion or a committee member other than the editors although in some cases one or more of the editors may also be a champion with responsibility for specific features. The editors are responsible for the overall structure and coherence of the ECMAScript specification. It is also the role of the editors to provide guidance and feedback to spec text authors so that as an addition matures, the quality and completeness of its specification improves. It is also the role of the editors to integrate additions which have been accepted as “finished” \(stage 4\) into a new revision of the specification.

