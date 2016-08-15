var $title = $('#title-input');
var $body = $('#body-input');
var $saveBtn = $('#save-button');
var $ideas = $('.idea-container');
var $searchIdeas = $('#search-input');
var $ideaContainer = $('.idea-container');

$(document).ready(function() {
  IdeaBox.pageLoad();
  $searchIdeas.keyup(function() {
    var filter = $(this).val();
    $('.idea').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
      }
    });
  });
});

function Idea(title, body, id=Date.now()) {
  this.title = title;
  this.body = body;
  this.id = id;
}

var IdeaBox = {

  ideasArray: [],

    generateNewIdea: function(title, body) {
      this.ideasArray.unshift(new Idea($title.val(), $body.val()));
      this.storeTheIdeaArray();
    },

    storeTheIdeaArray: function() {
      localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
      this.retrieveIdeas();
    },

    retrieveIdeas: function() {
      var storedIdeas = JSON.parse(localStorage.getItem('ideasArray'));
      if (storedIdeas) {
        this.ideasArray = storedIdeas.map(function(i) {
        return new Idea(i.title, i.body, i.id);
        });
      }
      this.ideasToPage();
    },

    ideasToPage: function() {
      $ideaContainer.html('');
      $ideaContainer.prepend(this.ideasArray.map(function(i) {
        return i.htmlRender();
      }));
    },

    findIdeaById: function(id) {
      return this.ideasArray.find(function(idea) {
        return idea.id === id;
      });
    },

    removeIdea: function(id) {
      id = parseInt(id);
      this.ideasArray = this.ideasArray.filter(function(i) {
      return i.id !== id;
      });
    this.storeTheIdeaArray();
    },

    editIdeaTitle: function(id, newTitle) {
      id = parseInt(id);
      var idea = this.findIdeaById(id);
      idea.title = newTitle;
      this.storeTheIdeaArray();
    },

    editIdeaBody: function(id, newBody) {
      id = parseInt(id);
      var idea = this.findIdeaById(id);
      idea.body = newBody;
      this.storeTheIdeaArray();
    },

    pageLoad: function() {
      this.retrieveIdeas();
      this.storeTheIdeaArray();
    }
};

Idea.prototype.htmlRender = function() {
  return $(`
    <article class="idea" id=${this.id}>
      <header class="idea-header">
        <h3 class="idea-title" contenteditable="true">${this.title}</h3>
        <button class="remove-idea"></button>
      </header>
      <body class="idea-body">
        <p class="idea-body" contenteditable="true">${this.body}</p>
      </body>
    </article>
    `);
  };

function clearInput() {
  $title.val('');
  $body.val('');
  $title.focus();
}

$saveBtn.on('click', function(event) {
  event.preventDefault();
  IdeaBox.generateNewIdea();
  IdeaBox.retrieveIdeas();
  clearInput();
});

$ideaContainer.on('click', '.remove-idea', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.removeIdea(id);
});

$ideaContainer.on('focusout', '.idea-title', function() {
  var id = $(this).parents('.idea').attr('id');
  var newTitle = $(this).text();
  IdeaBox.editIdeaTitle(id, newTitle);
});

$ideaContainer.on('keyup', '.idea-title', function(e) {
  if(e.which == 13) {
    $(this).focusout();
  }
});

$ideaContainer.on('focusout', '.idea-body', function() {
  var id = $(this).parents('.idea').attr('id');
  var newBody = $(this).text();
  IdeaBox.editIdeaBody(id, newBody);
});

$ideaContainer.on('keyup', '.idea-body', function(e) {
  if(e.which == 13) {
    $(this).focusout();
  }
});
