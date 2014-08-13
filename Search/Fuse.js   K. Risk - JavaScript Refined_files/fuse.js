$(function() {
  function start(books) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $rurlCheckbox = $('#repurl'),
        $rplCheckbox = $('#replanguage'),
        $caseCheckbox = $('#case'),

        searchURL = false,
        searchPL = true,
        isCaseSensitive = false,

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
      $result.empty();
      $.each(r, function() {
        $result.append('<li class="result-item">' + this.repository_url + ', <span>' + this.repository_language + '</span></li>');
      });
    }

    function createFuse() {
      var keys = [];
      if (searchURL) {
        keys.push('repository_url');
      }
      if (searchPL) {
        keys.push('repository_language');
      }
      fuse = new Fuse(books, {
        keys: keys,
        caseSensitive: isCaseSensitive
      });
    }

    function onRurlCheckboxChanged() {
      searchURL= $rurlCheckbox.prop('checked');
      createFuse();
      search();
    }

    function onRplCheckboxChanged() {
      searchPL = $rplCheckbox.prop('checked');
      createFuse();
      search();
    }

    function onCaseCheckboxChanged() {
      isCaseSensitive = $caseCheckbox.prop('checked');
      createFuse();
      search();
    }

    $rurlCheckbox.on('change', onRurlCheckboxChanged);
    $rplCheckbox.on('change', onRplCheckboxChanged);
    $caseCheckbox.on('change', onCaseCheckboxChanged);

    $inputSearch.on('keyup', search);

    createFuse();
  }

  $.getJSON('../data/github.json', function(data) {
     start(data);
  });

});