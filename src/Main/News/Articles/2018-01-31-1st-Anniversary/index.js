import React from 'react';
import PropTypes from 'prop-types';

import SpellLink from 'common/SpellLink';
import ItemLink from 'common/ItemLink';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS, { getCompletenessColor, getCompletenessExplanation, getCompletenessLabel } from 'common/SPEC_ANALYSIS_COMPLETENESS';
import RegularArticle from 'Main/News/RegularArticle';
import Timeline from './Timeline';

import v001 from './v0.0.1.gif';
import v020 from './v0.2.0.gif';
import v031 from './v0.3.1-small.png';
import HolyPaladinMasteryCalculatorV09 from './v0.9-small.png';
import HolyPaladinAnalyzerV141 from './v1.4.1-small.png';
import HolyPaladinAnalyzerV20 from './HolyPaladinAnalyzer-2.0-medium.gif';
import HolyPaladinAnalyzerV24 from './HolyPaladinAnalyzer-2.4.png';
import HolyPaladinAnalyzerV30Suggestions from './HolyPaladinAnalyzer-3.0-suggestions.png';
import RestoDruidAnalyzerV10 from './resto-druid-analyzer-1.0.png';
import WoWAnalyzerV10 from './WoWAnalyzer-v1.0.gif';
import WoWAnalyzerV109 from './WoWAnalyzer-v1.0.9.png';
import CharacterAndFightPullDownMenus from './CharacterAndFightPullDownMenus.gif';

function completeness(completeness) {
  return <dfn data-tip={getCompletenessExplanation(completeness)} style={{ color: getCompletenessColor(completeness) }}>{getCompletenessLabel(completeness)}</dfn>;
}
const SpecIcon = ({ spec }) => (
  <img
    src={`/specs/${spec.className.replace(' ', '')}-${spec.specName.replace(' ', '')}.jpg`}
    alt={`${spec.specName} ${spec.className}`}
    style={{ float: 'left', borderRadius: 5, margin: '5px 10px 10px 0px' }}
  />
);
SpecIcon.propTypes = {
  spec: PropTypes.object.isRequired,
};

/* eslint-disable jsx-a11y/accessible-emoji */

export default (
  <RegularArticle title="WoWAnalyzer's first anniversary" published="2017-12-24">
    It has already been a year! Time flies when you're having fun working hard. We want to use this milestone to look back at the progress we have made during this past year.<br /><br />

    In addition to the detailed recap below, here are some other interesting statistics:<br /><br />

    <ul style={{ marginBottom: 20 }}>
      <li><b>34</b> specs implemented with <b>16</b> specs marked as being {completeness(SPEC_ANALYSIS_COMPLETENESS.GOOD)} or {completeness(SPEC_ANALYSIS_COMPLETENESS.GREAT)}</li>
      <li><a href="https://github.com/WoWAnalyzer/WoWAnalyzer"><b>6,378 commits</b></a> from over <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/graphs/contributors"><b>58 contributors</b></a></li>
      <li><b>1.416 files</b> with over <b>141,371 lines of code</b></li>
      <li>Peak usage had over <b>140,000 unique visitors</b> and <b>13,500,000 pageviews</b> in a single month</li>
      <li><a href="https://discord.gg/AxphPxU">Our Discord server</a> has over <b>1,200 members</b></li>
      <li>It usually takes <a href="https://travis-ci.org/WoWAnalyzer/WoWAnalyzer/builds">about <b>5 minutes</b></a> for a code-change to be available on WoWAnalyzer.com</li>
    </ul>

    The project was started by <b>Zerotorescue</b>, a <span className="Paladin">Holy Paladin</span> theorycrafter at the time. Since it took several months before other contributors joined the project, the first half of the recap will be written from my point of view.<br /><br />

    <hr style={{ marginBottom: 20 }} />

    <Timeline>
      <div className="panel">
        <div className="date">
          31 Jan
        </div>
        <div className="panel-heading">
          <h2>The initial launch</h2>
        </div>
        <div className="panel-body">
          The 31st of January marked the launch of the first version of WoWAnalyzer, then named the <b>Holy Paladin mastery effectiveness calculator</b>. It was created out of the need to do more complex analysis that would not have be possible with only a simple spreadsheet.<br /><br />

          To understand what the project did back then you need to know that <SpellLink id={SPELLS.MASTERY_LIGHTBRINGER.id} icon>Mastery</SpellLink> causes a Holy Paladin's healing to be increased based on how close she is to the player she's healing. 0-10 yards provides full effectiveness and 10-40 yards decreases the boost to 0% linearly. In order to calculate how effective Mastery is you need to know the distance between the Holy Paladin and her target.<br /><br />

          For a long time it seemed impossible to accurately calculate this based on a log, but after a night of playing with Warcraft Logs' replay function to estimate my Mastery Effectiveness, I realized that it must have access to a player locations to be able to show the replay like it does. After some figuring out I got a proof of concept working, which became the <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/commit/bd7971995fe16d14aec7286765c13c2984c44d76">first commit</a> at <b>31 Jan 2017 00:02 CET</b>. I named project "Holy Paladin mastery effectiveness calculator" at the time because that was all it did.<br /><br />

          <figure>
            <img src={v001} alt="v0.0.1" />
            <figcaption>
              Holy Paladin mastery effectiveness calculator v0.0.1. Do note that at the time WCL throttled the events API to 300 events per API call, so loading a fight took considerably longer back then.
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="panel">
        <div className="date">
          4 Feb
        </div>
        <div className="panel-heading">
          <h2>A new layout</h2>
        </div>
        <div className="panel-body">
          As the project was getting a lot of attention in the Holy Paladin community, the layout was cleaned up a bit and a player breakdown was added. This layout stayed largely the same for a couple of months.<br /><br />

          <figure>
            <img src={v020} alt="v0.2.0" />
            <figcaption>
              Holy Paladin mastery effectiveness calculator v0.2.0
            </figcaption>
          </figure><br />

          With the mantra <a href="https://en.wikipedia.org/wiki/Release_early,_release_often">release early, release often</a> in mind the project quickly went through a lot of minor versions during this month. Among other things the need for users to enter their own WCL API key was removed, URL routing was added (so you can directly link to a log) and a <SpellLink id={SPELLS.RULE_OF_LAW_TALENT.id} icon /> uptime display (which improves a Holy Paladin's mastery effectiveness so was related) was added.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          18 Mar
        </div>
        <div className="panel-heading">
          <h2>Analyzing the first item: Drape of Shame</h2>
        </div>
        <div className="panel-body">
          In March a statistic that broadened the scope of project was added as it wasn't just related to a Holy Paladin's mastery effectiveness; the <ItemLink id={ITEMS.DRAPE_OF_SHAME.id} icon /> healing contribution statistic. For the first time this statistic gave insight into the exact value of <ItemLink id={ITEMS.DRAPE_OF_SHAME.id} icon />.<br /><br />

          <figure>
            <img src={v031} alt="v0.3.1" />
            <figcaption>
              Holy Paladin mastery effectiveness calculator v0.3.1 statistics at 18 Mar 2017
            </figcaption>
          </figure><br />

          The implementation of <ItemLink id={ITEMS.DRAPE_OF_SHAME.id} icon /> included a large part of the work needed for adding items, so it was possible to quickly add statistics for the similar legendaries <ItemLink id={ITEMS.ILTERENDI_CROWN_JEWEL_OF_SILVERMOON.id} icon /> and <ItemLink id={ITEMS.VELENS_FUTURE_SIGHT.id} icon /> in the next few days.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          25 Mar
        </div>
        <div className="panel-heading">
          <h2>Feeding other tools with new cast behavior statistics</h2>
        </div>
        <div className="panel-body">
          At the time Holy Paladins used a spreadsheet that I maintained to calculate their stat weights since healers can't be simmed. In an attempt to make filling the required fields easier and more accurate, I decided to add the required <b>cast behavior</b> statistics. This was the most important non-trivial information required that was used in the spreadsheet. This addition opened the door to showing more ability based statistics.<br /><br />

          <figure>
            <img src={HolyPaladinMasteryCalculatorV09} alt="Holy Paladin mastery effectiveness calculator v0.9" />
            <figcaption>
              The new cast ratios display (Holy Paladin mastery effectiveness calculator v0.9 at 25 Mar 2017)
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="panel">
        <div className="date">
          26 Mar
        </div>
        <div className="panel-heading">
          <h2>A big rewrite and a new name: Holy Paladin Analyzer</h2>
        </div>
        <div className="panel-body">
          The project was growing rapidly and that didn't seem to be going to stop anytime soon. Due to the organic growth of the project the codebase had kind of gotten... a mess. So it was time for spring cleaning!<br /><br />

          I rewrote pretty much every part of the codebase so that it would become easier to maintain and extend. The idea was to make every statistic a standalone module that completely isolates the analysis logic, and there would be a central "mission control center" that would take care of <i>rendering</i> the information in the proper way. This modular approach turned out to work really well and is still largely in place today. We did end up removing the central "mission control center" much later and instead now also include the rendering in each module to completely isolate separate modules.<br /><br />

          Accompanying this big rewrite was a name change and a version bump to <b>Holy Paladin Analyzer v1.0</b>. It only made sense since the scope has grown beyond just calculating mastery effectiveness.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          4 Apr
        </div>
        <div className="panel-heading">
          <h2>Always Be Casting</h2>
        </div>
        <div className="panel-body">
          Another important part of the Holy Paladin spreadsheet was downtime as this has a big impact on spell and mana usage. In the past I had already made a spreadsheet to estimate this based on total casts done and fight duration, but this didn't have the accuracy the analyzer could provide.<br /><br />

          <figure>
            <img src={HolyPaladinAnalyzerV141} alt="Holy Paladin Analyzer v1.4.1" />
            <figcaption>
              Holy Paladin Analyzer v1.4.1: new downtime statistic at 4 Apr 2017
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="panel">
        <div className="date">
          7 Apr
        </div>
        <div className="panel-heading">
          <h2>And yet another layout rework</h2>
        </div>
        <div className="panel-body">
          I usually start disliking things I designed myself in less than 2 days, and the project had been stuck with this basic layout for over 2 months so it was time to redo it once again. Inspired by <a href="http://akveo.com/blur-admin/#/dashboard">Blur Admin</a> I designed a new layout that was the basis for what we have today (disclaimer: I'm not a graphic designer).<br /><br />

          <figure style={{ maxWidth: 800 }}>
            <img src={HolyPaladinAnalyzerV20} alt="Holy Paladin Analyzer v2.0" />
            <figcaption>
              Holy Paladin Analyzer v2.0: a new look at 7 Apr 2017
            </figcaption>
          </figure><br />

          Over the next few months this layout has been updated left and right to improve it. Things like the red border on top of panels, added icons and color coding to panels to make them easier to scan, etc.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          11 Apr
        </div>
        <div className="panel-heading">
          <h2>Check your cast efficiency with the Cast Efficiency panel</h2>
        </div>
        <div className="panel-body">
          A Holy Paladin's most efficient spells are those that have a cooldown on them. This makes it very important to cast spells with cooldowns on them regularly for optimal performance. This led to the <b>Cast Efficiency</b> feature that was added showing the actual casts and an estimated max possible casts. The <i>Can be improved</i> indicator in this panel was the first step towards showing gameplay <i>suggestions</i>, something I had been thinking about doing for a long time.<br /><br />

          <figure>
            <img src={HolyPaladinAnalyzerV24} alt="Holy Paladin Analyzer v2.4" />
            <figcaption>
              The initial cast efficiency panel (Holy Paladin Analyzer v2.4 at 11 Apr 2017)
            </figcaption>
          </figure><br />

          With cast efficiency implemented, the Holy Paladin Analyzer now calculated the biggest part of the important metrics for Holy Paladins.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          14 Apr
        </div>
        <div className="panel-heading">
          <h2>Helping people help themselves with suggestions</h2>
        </div>
        <div className="panel-body">
          With the biggest part of the analysis required for Holy Paladins implemented, it finally meant I could implement the <b>suggestions</b> panel I wanted to do. The first version looked like this:<br /><br />

          <figure style={{ maxWidth: 800 }}>
            <img src={HolyPaladinAnalyzerV30Suggestions} alt="Holy Paladin Analyzer v3.0" />
            <figcaption>
              The first suggestions (Holy Paladin Analyzer v3.0 at 14 Apr 2017)
            </figcaption>
          </figure><br />

          The introduction of suggestions shifted the focus of the project a fair bit. In the past the focus was on showing hard to calculate metrics for helping theorycrafting, comparing items and improving data for other tools. After the introduction of suggestions the primary focus became more about helping the player improve his own performance. Calculating useful metrics for other purposes is still a goal but it is no longer the primary focus.<br /><br />

          The focus of the project was later solidified in a <a href="https://github.com/WoWAnalyzer/WoWAnalyzer#vision">Vision</a> section of the readme of the project.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          13 May
        </div>
        <div className="panel-heading">
          <h2>The launch of WoWAnalyzer.com 🎉</h2>
        </div>
        <div className="panel-body">
          At 11 May 2017 I decided on the name to use, purchased the <b>WoWAnalyzer.com</b> domain and started work on support for multiple specs in a single project. By 13 May 2017 I had finished implementing support for multiple spec analyzers. I rebranded the project to WoWAnalyzer and officially launched WoWAnalyzer.com at 13 May 2017.<br /><br />

          <figure>
            <img src={WoWAnalyzerV10} alt="WoWAnalyzer v1.0" />
            <figcaption>
              Going through all parts of the Holy Paladin section of WoWAnalyzer v1.0 at 13 May 2017
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="panel">
        <div className="date">
          15 May
        </div>
        <div className="panel-heading">
          <h2>Restoration Druid 🍂</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.RESTORATION_DRUID} />
          At 6 May 2017 <b>blazyb</b> reached out about creating an analyzer for <span className="Druid">Restoration Druid</span>. I talking him through it for a bit and he shared a lot feedback during the process. His feedback helped a lot to rewrite even more of the codebase to make it easier for others to work with and to make it more natural to implement different specs. After talking with blazyb about the future of the project a lot I decided that the best approach would be to launch a single website for multiple specs with it selecting the spec analyzer needed.<br /><br />

          Meanwhile blazyb worked on the <b>Resto Druid Analyzer</b> and ran an extensive private beta test. For this private beta test he had created a Discord server for feedback. Seeing this working well led to the shared <a href="https://discord.gg/AxphPxU">WoWAnalyzer Discord server</a> that we use today.<br /><br />

          The Resto Druid Analyzer was publicly released at 15 May 2017. Due to the amount of work involved in moving it into the shared project, it was initially released as a standalone "fork". The Resto Druid Analyzer was fully merged into the WoWAnalyzer project at 21 May 2017.<br /><br />

          <figure>
            <img src={RestoDruidAnalyzerV10} alt="Resto Druid Analyzer v1.0" />
            <figcaption>
              Resto Druid Analyzer v1.0 at 15 May 2017
            </figcaption>
          </figure><br />

          Other contributions to this spec:<br /><br />

          <b>greatman</b> contributored the initial Dreamwalker statistic.<br />
          <b>rubensayshi</b> introduced the concept of fixing bugs in Blizzard's combatlogs by re-ordering events. This concept evolved to "Events Normalizers" that we use today for fixing all sorts of weird combatlog bugs. He also improved a couple of features of the Resto Druid analyzer.<br />
          <b>Sref</b> (aka kfinch on GitHub) has done a lot of work on the Restoration Druid implementation and has added and improved a large part of the spec implementation.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          19 May
        </div>
        <div className="panel-heading">
          <h2>Discipline Priest</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.DISCIPLINE_PRIEST} />
          At 31 March 2017 <b>Josh</b> (MethodJosh since there are so many Joshes) contacted me about putting the code under an open license so that he could use parts for Disc Priest analysis. This led to a license that allows usage in non-commercial open source projects which was later replaced with the more formal <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/blob/master/LICENSE">AGPL</a> license that we still use today.<br /><br />

          Around the start of May I started thinking and talking about possibly adding support for another spec. I wanted to do this to continue growing the project and experience adding a new spec myself (after all the changes) and refine any rough edges I would run into. I got to talking with <b>Josh</b> again and he showed me a lot of research material that would help a lot in adding analysis for the spec. So I decided to start working on adding support for <b>Discipline Priest</b>. The first version of the Discipline Priest was added at 14 May 2017, and it was in a good state by 19 May 2017.<br /><br />

          <figure>
            <img src={WoWAnalyzerV109} alt="WoWAnalyzer v1.0.9" />
            <figcaption>
              Discipline Priest (WoWAnalyzer v1.0.9 at 19 May 2017)
            </figcaption>
          </figure><br />

          This spec had a lot of people contributing code: Zerotorescue, Reglitch, nutspanther, Oratio, Gao, hassebewlen, and milesoldenburg.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          19 May
        </div>
        <div className="panel-heading">
          <h2>The first PR by an outside contributor!</h2>
        </div>
        <div className="panel-body">
          Getting the first PR is very exciting! It means someone else is interested in your project enough to dedicate their free time to working on improving it. <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/pull/22">Our first PR</a> was created by <b>Reglitch</b> (aka rp4rk on GitHub) at 19 May 2017. In it he contributed an "editorconfig" file: "Fairly self explanatory, enforces consistency when multiple devs are working on the project.". It was merged a day later.<br /><br />

          Reglitch has later done a lot more work since then, primarily on the Discipline Priest implementation. He is now a part of the WoWAnalyzer admin team.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          21 May
        </div>
        <div className="panel-heading">
          <h2>Cooldowns overview</h2>
        </div>
        <div className="panel-body">
          I added the **Cooldowns** tab at 21 May 2017 to give more insight into cooldown usages, spells cast during them and throughput as a result.

          ![WoWAnalyzer v1.1](./WoWAnalyzer-v1.1.png)
          WoWAnalyzer v1.1 at 21 May 2017
        </div>
      </div>

      <div className="panel">
        <div className="date">
          24 May
        </div>
        <div className="panel-heading">
          <h2>A wild Discord server appeared!</h2>
        </div>
        <div className="panel-body">

        </div>
      </div>

      <div className="panel">
        <div className="date">
          25 May
        </div>
        <div className="panel-heading">
          <h2>Mistweaver Monk</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.MISTWEAVER_MONK} />
          <span className="Monk">Mistweaver Monk</span> support was [first proposed](https://github.com/WoWAnalyzer/WoWAnalyzer/pull/33) by **@Anomoly** at 23 May 2017, and merged to WoWAnalyzer.com after a short review process a day later.

          ![WoWAnalyzer v1.1.1](./WoWAnalyzer-v1.1.1.gif)
          WoWAnalyzer v1.1.1: initial Mistweaver support at 25 May 2017

          No other maintainers
        </div>
      </div>

      <div className="panel">
        <div className="date">
          28 May
        </div>
        <div className="panel-heading">
          <h2>Restoration Shaman</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.RESTORATION_SHAMAN} />
          <span className="Shaman">Restoration Shaman</span> support was <a href="https://github.com/WoWAnalyzer/WoWAnalyzer/pull/39">first added</a> by <b>versaya</b>.

          Other maintainers:
          Yuyz0112: Added <SpellLink id={SPELLS.ANCESTRAL_VIGOR_TALENT.id} /> metric
          Anomoly: Migrated to the new version and added T21 2 set and 4 set
          hatra344: Implemented the checklist
        </div>
      </div>

      <div className="panel">
        <div className="date">
          2 Jun
        </div>
        <div className="panel-heading">
          <h2>Setup CI and first server</h2>
        </div>
        <div className="panel-body">
          strel guided me through this, set up TravisCI that runs on any commit. Commits to a branch of the main repo make a Docker container that automatically gets deployed to the server. The experienced downtime of this process is only a few seconds. Server is a dedicated box by Scaleway. Cloudflare in front of everything, always.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          4 Jun
        </div>
        <div className="panel-heading">
          <h2>Basic Elemental Shaman support</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.ELEMENTAL_SHAMAN} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/66

          By Fasib

        </div>
      </div>

      <div className="panel">
        <div className="date">
          1 Jul
        </div>
        <div className="panel-heading">
          <h2>Holy Priest </h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.HOLY_PRIEST} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/96
          support added by enragednuke
          Skamer also contributed a couple of improvements, such as the Divinty Talent.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          19 Jul
        </div>
        <div className="panel-heading">
          <h2>The WoWAnalyzer browser extension</h2>
        </div>
        <div className="panel-body">

        </div>
      </div>

      <div className="panel">
        <div className="date">
          23 Jul
        </div>
        <div className="panel-heading">
          <h2>AttilioLH added Windwalker Monk support</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.WINDWALKER_MONK} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/129
        </div>
      </div>

      <div className="panel">
        <div className="date">
          25 Jul
        </div>
        <div className="panel-heading">
          <h2>Initial Subtlety Rogue support by zealk</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.SUBTLETY_ROGUE} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/130
        </div>
      </div>

      <div className="panel">
        <div className="date">
          7 Aug
        </div>
        <div className="panel-heading">
          <h2>Guardian Druid 🐻</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.GUARDIAN_DRUID} />
          Initial version by WOPR (aka shignman on GitHub)
          Later taken over by <b>faide</b> (aka FaideWW on GitHub).
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/137
        </div>
      </div>

      <div className="panel">
        <div className="date">
          14 Aug
        </div>
        <div className="panel-heading">
          <h2>Enhancement Shaman</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.ENHANCEMENT_SHAMAN} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/145

          By Nighteyez07

          No other maintainers
        </div>
      </div>

      <div className="panel">
        <div className="date">
          14 Aug
        </div>
        <div className="panel-heading">
          <h2>Vengeance Demon Hunter</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.VENGEANCE_DEMON_HUNTER} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/157

          By Mamtooth (aka ronaldpereira on GitHub)

          No other maintainers
        </div>
      </div>

      <div className="panel">
        <div className="date">
          18 Aug
        </div>
        <div className="panel-heading">
          <h2>Affliction Warlock</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.AFFLICTION_WARLOCK} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/166

          By Chizu (aka sMteX on GitHub)

          No other maintainers
        </div>
      </div>

      <div className="panel">
        <div className="date">
          20 Aug
        </div>
        <div className="panel-heading">
          <h2>Brewmaster Monk</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.BREWMASTER_MONK} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/177

          By WOPR (aka shighman on GitHub)

          emallson later took over as the primary maintainer of this spec and has since done a lot of work.
        </div>
      </div>

      <div className="panel">
        <div className="date">
          27 Aug
        </div>
        <div className="panel-heading">
          <h2>Shadow Priest</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.SHADOW_PRIEST} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/197

          By hassebewlen (aka hasseboulen on GitHub)

          No other maintainers
        </div>
      </div>

      <div className="panel">
        <div className="date">
          28 Aug
        </div>
        <div className="panel-heading">
          <h2>Character and fight selection pull down menus</h2>
        </div>
        <div className="panel-body">
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/200

          <figure>
            <img src={CharacterAndFightPullDownMenus} alt="Holy Paladin mastery effectiveness calculator v0.9" />
            <figcaption>
              NYI
            </figcaption>
          </figure>

          Later broken by Zerotorescue
        </div>
      </div>

      <div className="panel">
        <div className="date">
          30 Aug
        </div>
        <div className="panel-heading">
          <h2>Balance Druid</h2>
        </div>
        <div className="panel-body">
          <SpecIcon spec={SPECS.BALANCE_DRUID} />
          https://github.com/WoWAnalyzer/WoWAnalyzer/pull/210

          By Iskalla

          Later token over by Gebuz
        </div>
      </div>

      {/* TODO: Continue from https://github.com/WoWAnalyzer/WoWAnalyzer/pulls?page=7&q=is%3Apr+sort%3Acreated-asc */}

      <div className="panel">
        <div className="date">
          10 Jul
        </div>
        <div className="panel-heading">
          <h2>Other contributions</h2>
        </div>
        <div className="panel-body">
          Yuyz0112: Filter kills only fight: https://github.com/WoWAnalyzer/WoWAnalyzer/pull/106
          Riglerr: Updated Cooldown Tab & components to be able to represent damage as well as healing: https://github.com/WoWAnalyzer/WoWAnalyzer/pull/53
        </div>
      </div>
    </Timeline>

    ## Contributors

    ## User growth

    ## 2018
  </RegularArticle>
);