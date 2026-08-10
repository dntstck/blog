---
title: "vim-for-development"
date: 2026-08-09T02:03:22
publishDate: 2026-08-10T00:00:00
featured: true
devlog: false
tags: [vim, rust, c, lua, development, tools, ide, editor]
---

# vim for development

vim is secretly an extremely powerful integrated development environment; if you know how to set it up correctly.

this post covers compiling vim from source, installing youcompleteme, adding a plugin manager, custom themes,
custom plugins & how to tweak your `.vimrc` for full development potential.

# on languages

i primarily code in rust, c, lua or bash. this post will only cover those languages; however vim itself has a wide 
array of support for many languages built in & there are thousands of third party plugins for those that arent.

# prerequisites

these packages are required:

```bash
sudo apt install \
    git build-essential ncurses-dev \
    python3-dev lua5.3 liblua5.3-dev \
    ruby-dev cmake clang libclang-dev \
    exuberant-ctags python3
```

![vim prerequisites](assets/img/vim-prereqs.png)

as is this dir:

`cd && mkdir .vim/bundle`

# python 3.11

youcompleteme recently upped its minimum req for python from 3.11 to 3.12.
this can prove tricky on debian/ubuntu as python is required, cant be removed and 
is usually shipped with 3.11. the solution is to build it from source and then use 
make altinstall in place of make install.

```bash
wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz
tar xf Python-3.12.0.tgz
cd Python-3.12.0
./configure --enable-optimizations --enable-shared
make -j$(nproc)
sudo make altinstall
sudo ldconfig /usr/local/lib
```

# compiling vim from source

grab the repo:

```bash
git clone https://github.com/vim/vim
cd vim
```

now configure. features such as terminal, python & lua support are essential:

```bash
./configure \
    --with-features=huge \
    --enable-python3interp=yes \
    --enable-luainterp=yes \
    --enable-rubyinterp=yes \
    --enable-cscope \
    --enable-multibyte \
    --enable-terminal \
    --enable-gui=no \
    --prefix=/usr/local
```

![vim configure](assets/img/vim-config.png)

compile & install:

```bash
make -j$(nproc)
sudo make install
```

![vim compile](assets/img/vim-compile.png)

vim is now compiled and installed to the system.

# vundle, the vim plugin manager

vundle installs, manages or removes your third party plugins for vim

`git clone https://github.com/VundleVim/Vundle.vim ~/.vim/bundle/Vundle.vim`

# youcompleteme

ycm is a fully fledged semantic code completion tool and is essential for coding & development speed.

```bash 
cd ~/.vim/bundle
git clone https://github.com/ycm-core/YouCompleteMe
cd YouCompleteMe
git submodule update --init --recursive
python3.12 install.py --clang-completer --system-libclang --rust-completer
```

`--clangd-completer` & `--rust-completer` will install support for c, c++ and rust.
the `--all` command will install support for rust, c, cpp, c#, js, java & go
![ycm install](assets/img/vim-ycminstall.png)

# vim config

back in `~/`:

create a .vimrc; `vim .vimrc`

this is the configuration file for your user profile.

create a simple one, for now:

```bash
set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'ycm-core/YouCompleteMe'
Plugin 'rust-lang/rust.vim'

call vundle#end()
filetype plugin indent on

let g:ycm_global_ycm_extra_conf='~/.vim/bundle/YouCompleteMe/.ycm_extra_conf.py'
```

once the `.vimrc` is in; open vim and run this command:

`:PluginInstall`

![plugin install](assets/img/vim-plugininstall.png)

once it finishes press esc to enter command mode and type `:q` to close the plugin installer window,
 then press esc & type it again to leave vim.

the system now has vim compiled from source, youcompleteme and a plugin manager.
this does work as a very basic ide, but it can be taken much further

![vim basic](assets/img/vim-basic.png)

# advanced tweaks

## installing plugins

adding plugins from github is a breeze, simply add this line to your  `.vimrc`, preferably below the others:

`Plugin 'username/repo.vim'`

then install them inside vim using the `:PluginInstall` command.

there are thousands of plugins available. not just language support but many other tools/utilities that make 
development easier.

## plugins

below is a complete list of my personal favourites; you can use them all, or just choose a few you think you would use.
that's the beauty of vim, so exceptionally customisable that no two custom builds are ever the same.

### rust development

`Plugin 'rust-lang/rust.vim'` - essential for rust development. adds language support & more
`Plugin 'timonv/vim-cargo'` - enables the use of cargo inside vims command window.
`Plugin 'arzg/vim-rust-syntax-ext'` - provides extended syntax highlighting.
`Plugin 'dntstck/virgo'` - rust crate management tool for vim.

### ui enhancements

`Plugin 'preservim/tagbar'` -  ctags‑powered symbol/tag viewer in a right‑side pane.
`Plugin 'preservim/nerdtree'` - file explorer, viewable in a left pane.
`Plugin 'vim-airline/vim-airline'` - adds a  lightweight statusline with mode, branch, file info etc.
`Plugin 'vim-airline/vim-airline-themes'`- themes for airline.
`Plugin 'jistr/vim-nerdtree-tabs'` -  keeps nerdtree open across tabs; syncs nerdtree state between tabpages.
`Plugin 'ntpeters/vim-better-whitespace'` - highlights and optionally strips trailing whitespace.
`Plugin 'luochen1990/rainbow'` - colour codes brackets () & braces {}, exceptional for deep nests in code.
`Plugin 'mhinz/vim-startify'` - start screen with recent files, sessions, bookmarks.
`Plugin 'Yggdroot/indentLine'` - displays indentation guides, exceptional for deep nests in code.
`Plugin 'vimlab/split-term.vim'` - adds terminal split window for vim.
`Plugin 'junegunn/goyo.vim'`- enables the use of "zen mode" which lets you focus on code.
`Plugin 'junegunn/limelight.vim'` - limelight highlights your current line/code block & dims unfocused sections.

### navigation
`Plugin 'ludovicchabant/vim-gutentags'` - automatic tag generation; keeps tags updated in the background.
`Plugin 'junegunn/fzf.vim'` - enables fuzzy searching inside vim.
`Plugin 'scrooloose/nerdcommenter'` - smart commenting/uncommenting for many languages.
`Plugin 'Townk/vim-autoclose'` -  auto‑closes brackets, quotes, and pairs; (), {}, [], "", etc.
`Plugin '907th/vim-auto-save'` - enables autosaving.

### git integration
`Plugin 'tpope/vim-fugitive'` - definitive git interface for vim (:Gstatus, :Gdiff, :Gblame, etc.).
`Plugin 'airblade/vim-gitgutter'` - shows git diff signs in the gutter (added/modified/removed lines).

### code completion
`Plugin 'vim-scripts/ctags.vim'` - helper for ctags navigation; integrates tag lookups with vim commands.
`Plugin 'ycm-core/YouCompleteMe'` - semantic code completion engine.

### themes

`Plugin 'ayu-theme/ayu-vim'`  - ayu is a good call if you appreciate a light theme. the dark and mirage variants are even nicer.
`Plugin 'dntstck/vim-rusted'` - my own creation, pairs well with breeze dark / adwaita dark.

## vim tweaks

vim can be tweaked further not just with plugins, but with its `.vimrc` also.
here are some customizations you may find useful:

### general

```bash
set nocompatible              " Disable Vi compatibility
if has('termguicolors')       " Enable true color support
    set termguicolors
endif
filetype off                  " Disable filetype plugins initially
set number                    " Show line numbers
set cursorline                " Highlight the current line
set norelativenumber            " Disable Relative line numbers
set tabstop=4                 " Tab width
set shiftwidth=4              " Indentation width
set expandtab                 " Convert tabs to spaces
set incsearch                 " Incremental search
set hlsearch                  " Highlight search results
syntax on                     " Enable syntax highlighting
set mouse=a                   " Enable mouse support
set termwinsize=12x0          " Default terminal size
set splitbelow                " Open new splits below
set background=light          " Light background for colors
" let ayucolor="mirage"          " Ayu light color scheme
colorscheme rusted
let g:rainbow_active = 1       " Enable Rainbow
let g:limelight_default_coefficient = 0.9 " Dimming amount for Limelight
let g:airline_theme = 'rusted'
```

### youcompleteme

```bash
let g:ycm_confirm_extra_conf = 0
let g:ycm_show_detailed_diag_in_popup=1
let g:ycm_use_ultisnips_completer = 1
let g:ycm_collect_identifiers_from_tags_files = 1
let g:ycm_autoclose_preview_window_after_completion = 1
let g:ycm_use_completer_as_you_type = 1
let g:ycm_enable_semantic_folding = 1
let g:ycm_rust_completion_detail = 3
let g:ycm_completion_timeout_ms = 300
let g:ycm_enable_diagnostic_signs = 1
let g:ycm_key_invoke_completion = '<C-Space>'
inoremap <C-Space> <C-x><C-o>
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <CR> pumvisible() ? "\<C-y>" : "\<CR>"

let g:ycm_semantic_triggers = {
\ 'rust': ['->', '.', '::']
\ }

let g:ycm_language_server = [
  \ {
  \   'name': 'rust',
  \   'cmdline': [ '/home/sysadmin/.cargo/bin/rust-analyzer' ],
  \   'filetypes': [ 'rust' ],
  \ }
\ ]

let g:ycm_language_server_settings = {
\ 'rust-analyzer': {
\   'inlayHints': {
\     'enable': v:true
\   },
\   'diagnostics': {
\     'enable': v:true,
\     'disabled': [],
\     'enableExperimental': v:true,
\     'onChange': v:true,
\   }
\ }
\ }
```

### indentline

```bash
let g:indentLine_enabled = 1
let g:indentLine_char = '┊'
let g:indentLine_first_char = '┆'
let g:indentLine_showFirstIndentLevel = 1
set conceallevel=2
```

### keybindings

```bash
nmap <F2> :NERDTreeToggle<CR>       " Toggle NERDTree
nmap <F3> :TagbarToggle<CR>         " Toggle Tagbar
nmap <F5> :Goyo<CR>                 " Zen Mode
nmap <F6> :Limelight<CR>	    " Limelight on
nmap <F7> :Limelight!<CR>           " Limelight off
nnoremap <C-L> :tabnext<CR>         " Switch to the next tab
nnoremap <C-H> :tabprev<CR>         " Switch to the previous tab
nnoremap <Leader><Tab> <C-w>p       " Switch focus
nnoremap <Leader>i :wincmd h<CR>    " Focus Tree
nnoremap <Leader>o :wincmd l<CR>    " Focus main window
inoremap jj <Esc>                " Map 'jj' to escape
```

# :q

now, we have a fully customized custom vim install, with perfect plugins for development, 
advanced `.vimrc` tweaks, custom keybindings and custom themes. 

![vim full](assets/img/vim-full.png)

vim isn’t an ide out of the box, but once you build it properly and add the right tooling it becomes one of the fastest, most lightweight development environments you can run on anything.