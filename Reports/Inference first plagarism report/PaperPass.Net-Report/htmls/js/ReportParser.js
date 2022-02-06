function sentenceContent(sentenceData, sentenceId) {
    var sentenceDetail = parseSentence(sentenceData[sentenceId % 200]);
    var tel = template('similar-template', sentenceDetail);
    $("#detail-right").hide();
    $(".logo_right").hide();
    $(".sentence-detail").html(tel).show();
    $("body").scrollTop(0);
}

function parseSentence(sentence) {
    var totalCount = localCount = periodicalCount = degreeCount = conferenceCount = bookCount = netCount = otherCount = sbCount = 0;
    var data = [];
    sentence.result.forEach(res => {
        totalCount++;
        var sentenceData = {
            'score': Math.round(res.score * 100),
            'similaritySegGreyList': res.similaritySegGreyList,
            'originalSegGreyList': res.originalSegGreyList,
            'similaritySentence': res.similaritySentence,
            'subSimilaritySentenceSection': res.subSimilaritySentenceSection,
            'simpleDetailJson': res.duplicateSourceMD5,
            'articleType': res.articleType!='net'?res.articleType:'互联网',
            'classification': res.classification,
            'paperPassId': res.duplicateSourceMD5
        }
        if (sentenceData.articleType == 'OpenSearch') sentenceData.articleType = '自建库';
        if (res.classification == 'local' || res.classification == 'OpenSearch') {
            localCount++;
            switch (res.articleType) {
                case '学术期刊':
                    periodicalCount++;
                    sentenceData.source = '<span data-lang="Journal">Journal</span>';
                    sentenceData.title = JSON.parse(simSource[res.duplicateSourceMD5]).title;
                    sentenceData.simpleDetailJson = SentenceDetailParser.parsePeriodical(simSource[res.duplicateSourceMD5]);
                    break;
                case '书籍数据':
                    bookCount++;
                    sentenceData.source = '<span data-lang="BookData">Book Data</span>';
                    sentenceData.simpleDetailJson = SentenceDetailParser.parseBook(simSource[res.duplicateSourceMD5]);
                    break;
                case '学位论文':
                    degreeCount++;
                    sentenceData.source = '<span data-lang="Dissertation">Dissertation</span>';
                    sentenceData.simpleDetailJson = SentenceDetailParser.parseThesis(simSource[res.duplicateSourceMD5]);
                    break;
                case '学术会议':
                    conferenceCount++;
                    sentenceData.source = '<span data-lang="AcademicConferences">Academic Conferences</span>';
                    sentenceData.simpleDetailJson = SentenceDetailParser.parseConference(simSource[res.duplicateSourceMD5]);
                    break;
                case '自建库':
                    sbCount++;
                    sentenceData.source = '<span data-lang="SelfBuiltLibrary">Self-built Library</span>';
                    sentenceData.simpleDetailJson = SentenceDetailParser.parseSelfBuild(simSource[res.duplicateSourceMD5]);
                    break;
            }
        } else if (res.classification == 'net') {
            netCount++;
            sentenceData.source = '<span data-lang="Internet">Internet</span>';
            sentenceData.chuChu = JSON.parse(simSource[res.duplicateSourceMD5]).chuchu;
            sentenceData.title = JSON.parse(simSource[res.duplicateSourceMD5]).title;
        }
        data.push(sentenceData);
    });

    if (totalCount > 0) {
        var sentenceDetail = {
            'total': totalCount,
            'local': localCount,
            'periodical': periodicalCount,
            'degree': degreeCount,
            'conference': conferenceCount,
            'book': bookCount,
            'net': netCount,
            'sb': sbCount,
            'other': otherCount,
            'data': data
        } 
    }
    sentenceDetail.content = sentence.content;
    sentenceDetail.score = Math.round(sentence.result[0].score * 100);
    if (sentence.result[0].score >= 0.4) {
        sentenceDetail.synonymsContent = sentence.synonymsContent;
        sentenceDetail.segRedList = sentence.segRedList;
        sentenceDetail.newSegRedList = sentence.result[0].originalSegGreyList;
    }
    return sentenceDetail;
}

function wordsColor(SegGreyList, sentence, template) {
    var $returnString = '';
    var $beginPos = 0;
    var $prev = false;
    var $wholeArr = [];
    SegGreyList.forEach(object => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                var $c = object[key];
                var $s = key;
                var $len = $s.length;
                var $pos = sentence.indexOf($s, $beginPos);
                if ($pos !== false && $pos >= $beginPos) {
                    var $offsetPos = $pos - $beginPos;
                    if ($offsetPos != 0) {
                        var $offsetString = sentence.substr($beginPos, $offsetPos);
                        if ($c == "1" && $prev) {
                            $wholeArr.push({'s': $offsetString,'c': true});
                        } else {
                            $wholeArr.push({'s': $offsetString,'c': false});
                        }
                        $beginPos += $offsetPos;
                    }
                    if ($c == "1") {
                        $wholeArr.push({'s': $s,'c': true});
                        $prev = true;
                    } else {
                        $wholeArr.push({'s': $s,'c': false});
                        $prev = false;
                    }
                    $beginPos += $len;
                }
            }
        }
    });
    var $cString = '';
    $wholeArr.forEach($v => {
        if ($v['c']) {
            $cString =  $cString + $v['s'];
        } else {
            if ($cString != '') {
                $returnString = $returnString + template.replace('{%s}', $cString);
                $cString = '';
            }
            $returnString += $v['s'];
        }
    });
    if ($cString != '') {
        $returnString = $returnString + template.replace('{%s}', $cString);
    }
    return $returnString;
}

function subSimilaritySection( SubSimilaritySentenceSection, SimilaritySentence) {
    return SubSimilaritySentenceSection.replace(SimilaritySentence, '<span class="g-font-color green">'+ SimilaritySentence +'</span>');
}

function scoreColor(score) {
    if (score < 40) {
        return "green"
    } else if (score >= 70) {
        return "red"
    } else {
        return "orange"
    }
}

function issetString(params) {
    if (typeof params !== "undefined" && params != '') {
        return true;
    } else {
        return false;
    }
}

function issetArray(params) {
    if (typeof params !== "undefined" && params.length != 0) {
        return true;
    } else {
        return false;
    }
}

var SentenceDetailParser = {
    parsePeriodical: function(data) {
        if (issetString(data)) {
            var res = '';
            data = JSON.parse(data);
            if (issetString(data.title)) {
                res += '<div><span data-lang="Title">Title</span> : <span>'+ data.title +'</span></div>';
            }
            if (issetArray(data.author)) {
                res += '<div><span data-lang="Author">Author</span> : <span>'+ data.author.toString() +'</span></div>';
            }
            if (issetString(data.chuchu)) {
                res += '<div><span data-lang="Periodical">Periodical</span> : <span>'+ data.chuchu +'</span></div>';
            }
            if (issetString(data.year)) {
                var str = '<span data-lang="Issue">Issue</span> :  <span>'+ data.year +'</span>';
                if (issetString(data.issue)) {
                    str += ',<span>'+ data.issue +'</span>'; 
                }
                res += '<div>' + str + '</div>';
            }
            if (issetString(data.column)) {
                res += '<div><span data-lang="PeriodicalColumn">Periodical Column</span> : <span>'+ data.column +'</span></div>';
            }
            if (issetString(data.page)) {
                res += '<div><span data-lang="PageNumber">Page Number</span> : <span>'+ data.page +'</span></div>';
            }
            if (issetString(data.pageNum)) {
                res += '<div><span data-lang="NumberOfPages">Number Of Pages</span> : <span>'+ data.pageNum +'</span></div>';
            }
            if (issetString(data.cLCNumber)) {
                res += '<div><span data-lang="ClassificationNumber">Classification Number</span> : <span>'+ data.cLCNumber +'</span></div>';
            }
            if (issetArray(data.fundInfo)) {
                res += '<div><span data-lang="Funding">Funding</span> : <span>'+ data.fundInfo.toString() +'</span></div>';
            }
            if (issetString(data.publicationDate)) {
                res += '<div><span data-lang="PublicationDate">Publication Date</span> : <span>'+ data.publicationDate +'</span></div>';
            }
            var core = [];
            if (!(typeof data.isCoreISTIC == "undefined") && data.isCoreISTIC == 1) {
                core.push('ISTIC');
            }
            if (!(typeof data.isCoreNJU == "undefined") && data.isCoreNJU == 1) {
                core.push("CSSCI");
            }
            if (!(typeof data.isCorePKU == "undefined") && data.isCorePKU == 1) {
                core.push("PKU");
            }
            if (!(typeof data.isCoreSCI == "undefined") && data.isCoreSCI == 1) {
                core.push('SCI');
            }
            if (!(typeof data.isCoreEI == "undefined") && data.isCoreEI == 1) {
                core.push('EI');
            }
            if (core.length != 0) {
                res += '<div><span data-lang="PeriodicalLevel">Periodical Level</span> : <span>'+ core.toString() +'</span></div>';
            }
            if (issetString(data.iSSN)) {
                res += '<div><span data-lang="ISSN">ISSN</span> : <span>'+ data.iSSN +'</span></div>';
            }
            return res;
        }
    },
    parseThesis: function(data) {
        if (issetString(data)) {
            var res = '';
            data = JSON.parse(data);
            if (issetString(data.title)) {
                res += '<div><span data-lang="Title">Title</span> : <span>'+ data.title +'</span></div>';
            }
            if (issetArray(data.author)) {
                res += '<div><span data-lang="Author">Author</span> : <span>'+ data.author.toString() +'</span></div>';
            }
            if (issetString(data.chuchu)) {
                res += '<div><span data-lang="DegreeGrantingUnit">Degree Awarded Institution</span> : <span>'+ data.chuchu +'</span></div>';
            }
            if (issetString(data.year)) {
                res += '<div><span data-lang="DegreeYear">Degree Year</span> : <span>'+ data.year +'</span></div>';
            }
            if (issetString(data.degree)) {
                res += '<div><span data-lang="DegreeAwarded">Degree Awarded</span> : <span>'+ data.degree +'</span></div>';
            }
            if (issetString(data.cLCNumber)) {
                res += '<div><span data-lang="ClassificationNumber">Classification Number</span> : <span>'+ data.cLCNumber +'</span></div>';
            }
            if (issetArray(data.authorSubject)) {
                res += '<div><span data-lang="Major">Major</span> : <span>'+ data.authorSubject +'</span></div>';
            }
            if (issetArray(data.teacherName)) {
                res += '<div><span data-lang="TeacherName">Teacher Name</span> : <span>'+ data.teacherName.toString() +'</span></div>';
            }
            return res;
        }
    },
    parseConference: function(data) {
        if (issetString(data)) {
            var res = '';
            data = JSON.parse(data);
            if (issetString(data.title)) {
                res += '<div><span data-lang="Title">Title</span> : <span>'+ data.title +'</span></div>';
            }
            if (issetArray(data.author)) {
                res += '<div><span data-lang="Author">Author</span> : <span>'+ data.author.toString() +'</span></div>';
            }
            if (issetString(data.conference)) {
                res += '<div><span data-lang="Conference">Conference</span> : <span>'+ data.conference +'</span></div>';
            }
            if (issetArray(data.convener)) {
                res += '<div><span data-lang="Organizer">Organizer</span> : <span>'+ data.convener.toString() +'</span></div>';
            }
            if (issetString(data.conferenceDate)) {
                res += '<div><span data-lang="ConferenceDate">Conference Date</span> : <span>'+ data.conferenceDate +'</span></div>';
            }
            if (issetString(data.conferenceLocus)) {
                res += '<div><span data-lang="ConferenceLocation">Conference Location</span> : <span>'+ data.conferenceLocus +'</span></div>';
            }
            return res;
        }
    },
    parseBook: function(data) {
        if (issetString(data)) {
            var res = '';
            data = JSON.parse(data);
            if (issetString(data.category)) {
                res += '<div><span data-lang="Chapter">Chapter</span> : <span>'+ data.category +'</span></div>';
            }
            if (issetString(data.title)) {
                res += '<div><span data-lang="Title">Title</span> : <span>'+ data.title +'</span></div>';
            }
            if (issetArray(data.author)) {
                res += '<div><span data-lang="Author">Author</span> : <span>'+ data.author.toString() +'</span></div>';
            }
            if (issetString(data.publisher)) {
                res += '<div><span data-lang="Publisher">Publisher</span> : <span>'+ data.publisher +'</span></div>';
            }
            if (issetString(data.publicationDate)) {
                res += '<div><span data-lang="PublicationDate">Publication Date</span> : <span>'+ data.publicationDate +'</span></div>';
            }
            if (issetString(data.iSBN)) {
                res += '<div><span data-lang="ISBN">ISBN</span> : <span>'+ data.iSBN +'</span></div>';
            }
            return res;
        }
    },
    parseSelfBuild: function(data) {
        if (issetString(data)) {
            var res = '';
            data = JSON.parse(data);
            if (issetString(data.title)) {
                res += '<div><span data-lang="Title">Title</span> : <span>'+ data.title +'</span></div>';
            }
            if (issetArray(data.author)) {
                res += '<div><span data-lang="Author">Author</span> : <span>'+ data.author.toString() +'</span></div>';
            }
            if (issetString(data.publicationDate)) {
                res += '<div><span data-lang="PublicationDate">Publication Date</span> : <span>'+ data.publicationDate +'</span></div>';
            }
            if (issetArray(data.chuchu)) {
                res += '<div><span data-lang="Provenance">Origin</span> : <span>'+ data.chuchu +'</span></div>';
            }
            return res;
        }
    }
}