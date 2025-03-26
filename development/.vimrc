" vimrc - Main configuration file for Vim

    set nocompatible              " required
    filetype off                  " required
    
    " DO NOT DELETE - Runtime path for Vundle
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    
    " DO NOT DELETE
    Plugin 'gmarik/Vundle.vim'    
    
    " YouCompleteMe
    Plugin 'vim-scripts/ctags.vim'
    Plugin 'ycm-core/YouCompleteMe'
    
    " Plugins can be added here.
    " Usually, it's GITHUB USERNAME / GITHUB REPO or PLUGIN NAME
    Plugin 'ayu-theme/ayu-vim'
    Plugin 'preservim/tagbar'
    Plugin 'preservim/nerdtree'
    Plugin 'vim-airline/vim-airline'
    Plugin 'vim-airline/vim-airline-themes'

    
    call vundle#end()
    filetype plugin indent on
    
    " General Configuration
    set nocompatible
    if has('termguicolors')
        set termguicolors
    endif
    
    " Theme
    set guifont=Hack\ 10
    set background=dark
    let ayucolor="dark"
    colorscheme ayu
    
    " Indentation and Tabs
    set tabstop=4
    set shiftwidth=4
    set expandtab
    
    " Search Settings
    set incsearch
    set hlsearch
    set nu
    syntax on
    
    " Terminal Settings
    set termwinsize=12x0
    set splitbelow
    set mouse=a
    
    " Keyboard Shortcuts
    
    " Toggle NERDTree with F2
    nmap <F2> :NERDTreeToggle<CR>
    
    " Toggle Tagbar with F3
    nmap <F3> :TagbarToggle<CR>
    
    " Buffer navigation
    set hidden
    nnoremap <C-L> :bnext<CR>
    nnoremap <C-H> :bprev<CR>
    
    " NERDTree Configuration
    let NERDTreeShowBookmarks = 1
    let NERDTreeShowHidden = 1
    let NERDTreeShowLineNumbers = 0
    let NERDTreeMinimalMenu = 1
    let NERDTreeWinPos = 'left'
    let NERDTreeWinSize = 31
    
    " Tagbar Configuration
    let g:tagbar_autofocus = 1
    let g:tagbar_autoshowtag = 1
    let g:tagbar_position = 'botright vertical'
    
    let g:ycm_show_detailed_diag_in_popup=1

    let g:ycm_key_list_select_completion = ['<C-h>', '<C-l>']
    let g:ycm_key_list_previous_completion = ['<C-l>']
    
    " Disable arrow keys. no cheating!
    noremap <Up> <Nop>
    noremap <Down> <Nop>
    noremap <Left> <Nop>
    noremap <Right> <Nop>
    
    " Map 'jj' to Escape from insert mode
    inoremap jj <Esc>
    
    
    