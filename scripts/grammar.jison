/* description: Grammar for SLang 1 */

/* lexical grammar */
%lex

DIGIT                 [0-9]
LETTER                [a-zA-Z]

%%

\s+                                   { /* skip whitespace */ }
"fn"                                  { return 'FN'; }
"("                                   { return 'LPAREN'; }
")"                                   { return 'RPAREN'; }
"["                                   { return 'LBRAC'; }
"]"                                   { return 'RBRAC'; }
"+"                                   { return 'PLUS'; }
"-"                                   { return 'MINUS'}
"*"                                   { return 'TIMES'; }
"/"                                   { return 'DIV'; }
"%"                                   { return 'REM'; }
"~"                                   { return 'NEG'; }
"add1"                                { return 'ADD1'; }
"::"                                  { return 'CONS'; }
"hd"                                  { return 'HD'; }
"tl"                                  { return 'TL'; }
"isNull"                              { return 'ISNULL'; }
","                                   { return 'COMMA'; }
"=>"                                  { return 'THATRETURNS'; }
"<"                                   { return 'LT'; }
">"                                   { return 'GT'; }
"==="                                 { return 'EQ'; }
"not"                                 { return 'NOT'; }
<<EOF>>                               { return 'EOF'; }
{LETTER}({LETTER}|{DIGIT}|_)*         { return 'VAR'; }
{DIGIT}+                              { return 'INT'; }
.                                     { return 'INVALID'; }

/lex

%start program

%% /* language grammar */

program
    : exp EOF
        { return SLang.absyn.createProgram($1); }
    ;

exp
    : var_exp       { $$ = $1; }
    | intlit_exp    { $$ = $1; }
    | fn_exp        { $$ = $1; }
    | app_exp       { $$ = $1; }    
    | prim_app_exp1 { $$ = $1; }
    | prim_app_exp2 { $$ = $1; }
    | bool_exp      { $$ = $1; }
    | list_exp      { $$ = $1; }
    ;

var_exp
    : VAR  { $$ = SLang.absyn.createVarExp( $1 ); }
    ;

intlit_exp
    : INT  { $$ = SLang.absyn.createIntExp( $1 ); }
    ;

fn_exp
    : FN LPAREN formals RPAREN THATRETURNS exp
           { $$ = SLang.absyn.createFnExp($3,$6); }
    ;

formals
    : /* empty */ { $$ = [ ]; }
    | VAR moreformals 
        { var result;
          if ($2 === [ ])
             result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }
    ;

moreformals
    : /* empty */ { $$ = [ ] }
    | COMMA VAR moreformals 
       { $3.unshift($2); 
         $$ = $3; }
    ;

forms
    : /* empty */ { $$ = [ ]; }
    | INT moreforms 
        { var result;
          if ($2 === [ ])
             result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }
    ;

moreforms
    : /* empty */ { $$ = [ ] }
    | COMMA INT moreforms 
       { $3.unshift($2); 
         $$ = $3; }
    ;

app_exp
    : LPAREN exp args RPAREN
       {  $3.unshift("args");
          $$ = SLang.absyn.createAppExp($2,$3); }
    ;

prim_app_exp1
    : prim_op1 LPAREN prim_args RPAREN
       { $$ = SLang.absyn.createPrim1AppExp($1,$3); }
    ;

prim_op1
    : NEG      { $$ = $1; }
    | ADD1     { $$ = $1; }
    | NOT      { $$ = $1; }
    | HD       { $$ = $1; }
    | TL       { $$ = $1; }
    | ISNULL   { $$ = $1; }
    ;

prim_app_exp2
    : LPAREN prim_args prim_op2 prim_args RPAREN
       { $$ = SLang.absyn.createPrim2AppExp($3,$2,$4); }
    ;

bool_exp
    : "true"         { $$ = SLang.absyn.createBoolExp(true); }
    | "false"        { $$ = SLang.absyn.createBoolExp(false); }
    ;

list_exp
    : LBRAC forms RBRAC 
        { $$ = SLang.absyn.createListExp($2); }
    ;

prim_op2
    : PLUS       { $$ = $1; }
    | MINUS      { $$ = $1; }
    | TIMES      { $$ = $1; }
    | DIV        { $$ = $1; }
    | REM        { $$ = $1; }
    | LT         { $$ = $1; }
    | GT         { $$ = $1; }
    | EQ         { $$ = $1; }
    | CONS       { $$ = $1; }
    ;

args
    : /* empty */ { $$ = [ ]; }
    | exp args
        { var result;
          if ($2 === [ ])
             result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }
    ;

prim_args
    :  /* empty */ { $$ = [ ]; }
    |  exp         { $$ = $1; }
    ;
%%
