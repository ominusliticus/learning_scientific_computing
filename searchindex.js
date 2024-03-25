Search.setIndex({"docnames": ["app_chapters/linear_interpolation", "app_chapters/numerical_integration", "cpp_chapters/compilation_and_debugging", "cpp_chapters/functions", "cpp_chapters/values_and_types", "cpp_chapters/what_is_a_program", "hpc_chapters/ssh", "introduction", "title"], "filenames": ["app_chapters/linear_interpolation.md", "app_chapters/numerical_integration.md", "cpp_chapters/compilation_and_debugging.md", "cpp_chapters/functions.md", "cpp_chapters/values_and_types.md", "cpp_chapters/what_is_a_program.md", "hpc_chapters/ssh.md", "introduction.md", "title.md"], "titles": ["<span class=\"section-number\">7. </span>Linear Interpolation", "<span class=\"section-number\">6. </span>Numerical Integration", "<span class=\"section-number\">3. </span>Compilation, Debugging and Debuggers", "<span class=\"section-number\">5. </span>Functions, Operators, Lambda Expressions, Function Overloading and Variadic Templates", "<span class=\"section-number\">4. </span>Variables, Values, Types and Templates", "<span class=\"section-number\">2. </span>What is a program", "<span class=\"section-number\">8. </span>Connecting to remote servers", "<span class=\"section-number\">1. </span>Introduction", "Learning Scientific Computing"], "terms": {"plan": [], "continu": [3, 4], "c": [0, 3, 4, 5], "learn": [2, 3, 5], "project": [2, 4], "should": [0, 2, 4, 5], "base": [2, 4], "our": [0, 2, 4, 5, 7], "case": 4, "simul": [4, 7], "n": [0, 7], "particl": [], "box": 4, "introduc": [2, 3, 4], "concept": 4, "from": [2, 5, 7], "stl": 7, "safe": [], "good": [2, 4, 5], "program": [2, 3, 4, 7, 8], "practic": 0, "oo": [], "function": [0, 1, 2, 4, 5, 7, 8], "mutat": [], "encapsul": 4, "composit": [], "functor": [], "applic": [], "templat": [0, 7, 8], "metaprogram": 4, "daisi": [], "chang": 4, "cours": [], "vizqgp": [], "visual": 2, "veri": [2, 7], "larg": [2, 4], "complex": 4, "languag": [2, 4, 5, 7], "It": [0, 2, 4], "also": [2, 4, 5], "constantli": [], "mean": [4, 5, 7], "person": 7, "profici": [], "best": [0, 7], "ten": [], "year": [2, 4], "ago": [], "might": 7, "understand": [2, 5], "modern": [2, 4, 7], "In": [0, 1, 2, 3, 4, 5], "thi": [0, 1, 2, 3, 4, 5, 7], "chapter": [1, 2, 3, 4, 5], "we": [0, 1, 2, 3, 4, 5, 7], "try": 7, "give": [0, 2, 4, 7], "broad": [], "overview": 7, "mani": [4, 7], "possibl": 2, "code": [0, 2, 3, 4, 5, 7], "write": [0, 2, 3, 4, 5, 7], "first": [0, 2, 4, 5, 7], "coupl": 7, "after": 4, "you": [0, 2, 3, 4, 5, 7], "abl": 2, "doe": [2, 4, 5], "input": [0, 2], "output": [2, 4, 5], "solv": [], "differenti": 7, "equat": 7, "all": [0, 2, 3, 4, 5], "come": [2, 4, 7], "some": [0, 2, 4, 7], "word": [2, 4], "have": [0, 2, 3, 4, 5, 7], "specif": [3, 5], "when": [0, 2, 4, 7], "thei": [2, 4, 7], "show": [2, 5], "up": [0, 2, 4, 7], "sourc": [0, 2, 5], "special": [], "work": [2, 4, 5], "ar": [0, 2, 4, 5, 7], "call": [0, 2, 4, 5], "reserv": 4, "python": [], "ha": [2, 4, 5, 7], "35": [], "while": [0, 4, 5], "97": [], "7": [], "alreadi": [3, 4], "progress": [], "unless": [], "softwar": 7, "engin": [], "realli": [2, 4], "reason": [2, 4], "would": [0, 2], "need": [0, 4, 7], "even": [2, 3, 4], "50": [], "highlight": [], "them": [4, 7], "underscor": 4, "rule": [1, 5], "must": [2, 4], "follow": [0, 2, 3, 4], "compil": [0, 3, 4, 5, 7, 8], "interpret": 0, "instruct": [2, 3, 5], "simpl": 4, "variabl": [0, 2, 3, 5, 7, 8], "name": [0, 2], "includ": [0, 1, 2, 4, 5, 7], "becaus": [2, 4, 7], "sens": [], "start": [0, 2, 4], "an": [0, 2, 3, 4, 5], "alphabet": 4, "charact": 4, "contain": 4, "number": [0, 2, 4, 7], "letter": 4, "dollar": [], "sign": 4, "statement": 2, "end": 7, "semicolon": 2, "control": 7, "flow": [], "enclos": [], "parenthes": [], "curli": [], "brace": 4, "determin": [2, 3, 4], "scope": [], "go": [2, 4], "systemat": [], "explain": [2, 5], "rather": [0, 4], "question": [], "can": [0, 2, 4, 5, 7], "alwai": [], "refer": [2, 4, 7], "cpprefer": 4, "com": 4, "guid": [], "jump": [], "straight": [], "The": [0, 2, 5, 7], "standard": [2, 4, 5, 7], "comparison": [], "iostream": [0, 2, 5], "int": [0, 2, 4, 5], "main": [2, 5], "std": [0, 2, 4, 5, 7], "cout": [2, 5], "return": [0, 2, 4, 5], "0": [0, 2, 4, 5], "print": [2, 3, 4, 5], "let": [2, 4], "s": [0, 1, 2, 4], "dissect": [], "direct": 2, "tell": 4, "fetch": [], "librari": [2, 5, 7], "header": [0, 5], "past": [2, 5], "cpp": [2, 4, 5], "document": 7, "abstract": 2, "common": [2, 4, 7], "These": [2, 4, 5], "gener": [0, 2, 4, 5, 7], "stream": 2, "so": [0, 2, 7], "transpar": [], "now": [0, 2, 4], "block": [], "defin": [0, 1, 2, 3, 7], "delar": [], "style": [], "return_typ": [], "function_nam": [], "type_1": [], "arg_1": [], "type_2": [], "args_2": [], "bodi": 7, "statemet": [], "most": [0, 2, 4, 5, 7], "look": [2, 4, 5], "which": [0, 2, 4, 5, 7], "within": [0, 4], "suppli": 1, "consid": 4, "entri": [], "point": [0, 2], "multipl": 7, "throw": 4, "error": [2, 4, 7], "time": [2, 4, 7], "hard": 2, "peopl": 5, "creat": [2, 4], "termin": 2, "part": [0, 2, 4, 7], "stand": [], "ship": 2, "everi": [2, 4], "out": [2, 4, 5], "anoth": [4, 5], "screen": [], "doubl": 4, "colon": 2, "between": [0, 2, 4, 5], "resolut": 0, "oper": [0, 2, 4, 5, 7, 8], "indic": [0, 2, 4], "belong": [], "namespac": [], "fact": [], "one": [0, 1, 2, 4], "us": [0, 2, 4, 5, 7], "conveni": [4, 5], "distinguish": 4, "same": 4, "For": [2, 4], "exampl": [0, 2, 4], "mai": [2, 7], "real": [], "sqrt": [], "take": [2, 4, 5], "squar": [], "root": [], "therefor": [], "declar": [0, 3], "sit": [2, 7], "x": 0, "here": [0, 2, 4, 5, 7], "notat": [], "elucid": [], "littl": 3, "later": 4, "z": 4, "know": [0, 2, 4, 5, 7], "insert": 2, "care": 0, "about": [0, 2, 3, 4, 5], "essenti": [2, 4], "inform": [], "right": [1, 2, 4, 5], "left": [1, 4, 5], "ident": [], "simpli": [], "replac": [2, 4], "string": [2, 4, 5], "technic": 4, "const": [0, 2, 5], "char": [2, 4, 5], "arrai": [0, 1, 7], "add": [2, 5], "new": [4, 5], "line": [2, 5, 7], "non": 4, "void": 4, "type": [0, 3, 5, 7, 8], "zero": 4, "system": [2, 3, 4, 7], "comput": [2, 4, 5], "execut": [2, 5, 7], "successfulli": [], "modifi": [2, 4], "abov": [0, 4, 5], "again": [], "provid": [0, 2, 4, 5, 7], "fstream": [], "fout": [], "output_fil": [], "txt": [], "close": [], "open": [], "w": [], "f": 0, "itself": 2, "actual": [0, 4, 5], "construct": [4, 7], "object": [2, 4, 7], "notic": 2, "At": 4, "releas": [], "resourc": [2, 4], "consum": 2, "throughout": [2, 3], "had": 7, "context": 4, "import": [5, 7], "acquir": [], "alloc": 0, "dealloc": [], "memori": [0, 2, 4, 7], "where": [0, 2, 4, 7], "lot": [2, 7], "spent": [], "optim": [0, 2, 5], "run": [2, 5], "effici": 2, "cover": 7, "advanc": [], "treatment": [], "assum": 4, "initi": 4, "valu": [0, 2, 3, 7, 8], "problem": [2, 4], "form": [2, 4], "begin": [2, 4], "align": [], "t": [0, 2, 3, 4, 5], "quad": [], "t_0": [], "x_0": [], "method": 0, "just": [2, 4, 7], "rk4": [], "schemat": [], "k_1": [], "1": [0, 4], "t_n": [], "k_2": [], "frac": 0, "h": [], "2": [0, 4], "k_3": [], "k_4": [], "j": [], "t_": [], "6": [], "2k_2": [], "21k_3": [], "iomanip": [], "manipul": 2, "format": 0, "cmath": 0, "exp": 0, "cosh": [], "don": 2, "yet": [], "symbol": [2, 4, 5], "exist": 4, "_prototyp": [], "function_": [], "solut": [], "condit": [], "t_f": [], "10": 4, "size_t": 4, "100": 4, "step": 2, "integr": [7, 8], "float": [2, 4], "reppres": [], "differ": [2, 4], "binari": [0, 2], "To": [2, 4, 5, 7], "make": [0, 2, 4, 5, 7], "sure": 5, "being": 2, "multipli": [], "hint": 7, "what": [2, 4, 7, 8], "cast": [], "static_cast": 0, "ing": [], "do": [0, 2, 5], "desir": [], "current": 2, "setw": [], "3": [], "setprecis": [], "9": [], "calcul": [], "next": [0, 2, 4, 5], "5": [], "updat": 2, "logic": 0, "impli": [], "last": [2, 3, 4], "explicitli": [], "arbitrari": [], "choic": [], "onlin": [], "explor": [2, 5], "link": [2, 4, 5], "perhap": [], "ambigu": [], "store": [0, 2, 4], "thought": [], "equival": 4, "numpi": [], "np": [], "befor": [0, 2, 4], "window": [2, 5], "mous": [], "navig": [5, 7], "happen": [2, 4], "view": [], "text": 2, "wa": [2, 3], "enter": [], "singl": [0, 4], "despit": [], "seemingli": [], "limit": 2, "seem": [], "offer": [2, 4], "minim": 7, "interfac": [1, 2, 7], "typic": [2, 4], "boil": [], "down": [2, 5], "someth": [], "like": [0, 2, 5, 7], "delet": [], "file": [0, 2, 4, 5], "directori": [], "etc": [2, 4], "sole": [], "focu": [2, 7], "find": [0, 2], "linux": [2, 5], "maco": 2, "press": [], "space": 0, "cmd": [], "super": [], "your": [2, 4, 5], "whenev": [], "cd": [], "director": [], "ls": [], "list": 2, "mkdir": [], "rm": [], "remov": 2, "note": [2, 3, 4, 7], "As": [0, 4, 5, 7], "familiar": [2, 7], "ourselv": [], "how": [0, 2, 3, 4, 7], "structur": [2, 7], "want": [0, 2, 4], "appreci": 2, "plumb": [], "goe": 0, "design": 7, "each": [0, 2, 3, 5], "set": [0, 2, 7], "pass": [2, 7], "behavior": [2, 4], "see": [2, 4, 5], "click": 5, "drop": 5, "menu": 5, "i": [0, 2, 4, 5, 7], "requir": [0, 2, 4], "feed": [], "argument": [2, 4], "path": [], "There": [2, 4, 5], "ever": 2, "worri": [], "dir": [], "folder": 2, "two": [0, 2, 4], "subdirectori": [], "item": [], "per": [], "l": 2, "addit": [2, 7], "privileg": [], "size": [2, 4], "stamp": [], "owner": [], "human": 2, "readabl": [], "unit": [2, 5], "r": [2, 4], "recurs": [], "iter": [], "through": [2, 4], "those": [2, 3, 4], "well": [2, 7], "lrh": [], "implicitli": [], "shown": [], "combin": [3, 4], "preform": [2, 5], "order": 2, "matter": [], "separ": [0, 4], "dir1": [], "dir2": [], "dir3": [], "sensit": [], "consecut": [], "onli": [2, 4], "p": [], "If": [2, 4, 5], "given": [0, 4], "parent": [], "danger": [], "especi": [2, 4, 7], "certain": 4, "check": [], "sometim": 4, "ask": 2, "verifi": [], "whether": [0, 2, 4], "said": [], "allow": [1, 2, 4, 7], "circumv": [], "inconveni": [], "forcelli": [], "saw": [], "more": [0, 2, 4, 7], "instal": [2, 5], "ones": 5, "tutori": 2, "cp": [], "copi": [4, 5, 7], "move": [0, 7], "think": [2, 4], "mv": [], "renam": [], "cut": [], "cat": 2, "content": [2, 5], "git": 7, "version": [2, 7], "extens": [], "vim": [], "editor": [], "hate": [], "relat": [], "gcc": 2, "clang": 2, "short": 4, "vs": 7, "popular": [], "noevim": [], "my": [5, 7], "favorit": [2, 5], "gdb": 2, "runtim": [], "debugg": [7, 8], "ani": [0, 2, 4, 5], "featur": 3, "man": [], "page": [], "depth": [], "variou": [2, 5], "wai": 4, "access": 2, "interrog": 4, "describ": 2, "setup": 7, "sampl": [], "By": [], "makefil": [], "enought": [], "howev": [0, 2, 4], "rare": [], "express": [0, 4, 7, 8], "organ": [], "distinct": 4, "class": [0, 4, 7], "defint": [], "whole": 2, "worm": [], "easili": 2, "identifi": 4, "hpp": 5, "hxx": [], "other": [0, 2, 4, 5, 7], "translat": [2, 5], "static": [], "cxx": [], "sever": [1, 2], "machin": [2, 5], "process": 2, "stage": 2, "dure": [], "o": 2, "linker": 5, "match": 5, "definit": 0, "gnu": 2, "much": [0, 4], "newer": [], "fanci": [], "und": [], "hood": [2, 4], "complet": [2, 4], "irrelev": [], "sake": 4, "readili": [], "avail": 2, "pain": [], "command": [5, 7], "queri": [], "help": [4, 5, 7], "option": [4, 5, 7], "far": 4, "than": [0, 4], "digest": [], "luckili": [], "flag": [], "specifi": [], "iso": [2, 4], "recent": 4, "23": [], "purpos": [2, 5, 7], "20": 4, "wall": [], "wextra": [], "wpedant": [], "three": [2, 4, 5, 7], "extra": 4, "fastidi": [], "potenti": [], "mistak": [], "could": [0, 2, 4], "made": [2, 3], "unus": [], "uniniti": [], "abouv": [], "readi": [], "exam": [], "ple": [], "th": [], "Then": 0, "save": [], "did": [], "becom": [0, 7], "complic": [4, 7], "comand": [], "autom": [], "facilit": [], "systsem": [], "cmake": [], "premak": [], "meson": [], "magini": [], "own": [2, 4], "shell": 7, "below": [2, 4], "besid": 4, "often": [], "its": [0, 2, 3, 4, 7], "grow": [], "develop": [2, 4], "fluenci": [], "leav": [], "disgress": [], "four": [], "essentailli": [], "meaning": [], "group": [], "sai": 3, "bunch": [], "math": [], "plot": [], "routin": [], "regardless": [], "awar": 2, "properli": [], "annoi": [], "aris": [], "els": 0, "loophol": [], "figur": [], "fill": [], "separat": [], "decalar": [], "dt": [], "ifndef": [], "_rk4_hpp_": [], "stddef": [], "_documented_": [], "although": [], "doxygen": [], "rung": [], "kutta": [], "4": [2, 4], "ordinari": 7, "pointer": [1, 2, 4, 5, 7], "numer": [7, 8], "endif": [], "keep": [2, 4], "track": [2, 4], "edit": [], "place": 4, "overwrit": [], "Such": [], "data": [0, 2, 4, 7], "expens": [0, 4], "spend": [], "cpu": [2, 5, 7], "cycl": [], "address": 4, "fix": [], "ad": 2, "astric": [], "A": [0, 2, 3, 4], "advantag": [], "paramet": [0, 4, 7], "variad": [0, 7, 8], "inlcud": [], "without": [2, 4, 5], "detail": [0, 2, 4], "moden": [], "doublt": [], "With": [], "hand": [4, 5], "extend": [], "none": [], "truli": 4, "themselv": [], "usual": [0, 2, 7], "comment": 2, "found": [0, 2, 4], "pretti": [], "larger": [], "One": [3, 4, 5], "further": [2, 5], "omit": [], "area": [], "src": [], "obj": [], "inc": [], "posix": [2, 7], "src_file": [], "greedi": [], "regex": [], "matchin": [], "obj_fil": [], "patsubst": [], "info": [], "unam": [], "uname_": [], "consol": [], "branch": 2, "os": [], "ifeq": [], "cc": [], "level": 4, "appli": [], "faster": [], "opt": [], "o3": [], "mmd": [], "depend": 0, "mp": [], "trigger": [], "rebuild": [], "make_opt": [], "d": [], "ex": [], "_automat": [], "variables_": [], "http": [], "www": [], "org": [], "manual": [], "html_node": [], "automat": [], "html": [], "target": 2, "prerequisit": [], "lastli": [0, 7], "been": [2, 5], "tab": [], "otherwis": [], "mmake_opt": [], "clean": [], "rf": [], "wish": [], "quicker": [], "core": 4, "job": 5, "j8": [], "noth": [], "expand": 4, "systm": [], "am": 7, "myself": [], "primari": [0, 4, 7], "idea": [], "pure": [], "implement": [], "repositori": [], "semi": 2, "magini_compil": [], "magini_save_output": [], "magini_implement": [], "third_parti": [], "maybe_unus": [], "argc": [], "argv": [], "magini_initiate_log": [], "print_disclaim": [], "rebuild_magini": [], "buildtre": [], "build_tre": [], "has_librari": [], "fals": [0, 2, 4], "try_main": [], "add_director_build_tre": [], "auto": 0, "c_str": [], "But": [2, 3], "feel": [2, 5], "free": [4, 5], "reach": [], "me": 2, "interest": 4, "intend": [2, 7], "anyon": 7, "get": [2, 5, 7], "scientif": 7, "guidanc": 7, "train": 7, "expect": [2, 4, 7], "tool": [2, 5, 7], "trick": [5, 7], "bash": 7, "script": 7, "basic": [2, 4, 7], "intermdi": 7, "github": 7, "cluster": [2, 7], "vast": 7, "major": 7, "dedic": 7, "high": 2, "demonstr": 7, "disclaim": 7, "ahead": [2, 7], "fan": 7, "inherit": [4, 7], "coverag": 7, "topic": [4, 7], "stumbl": 7, "upon": 7, "idiom": 7, "curious": 7, "recur": 7, "present": [1, 7], "reflect": 7, "opinion": 7, "big": 7, "freedom": 7, "emphasi": 7, "mention": [2, 4, 5, 7], "teach": [2, 7], "reli": [2, 5, 7], "2011": 7, "onward": 7, "fairli": 7, "decent": 7, "review": [2, 7], "capabl": 7, "comprehens": 7, "enough": [3, 4, 5, 7], "repres": [2, 4, 5, 7], "full": 7, "milieu": 7, "salient": 7, "quit": 7, "enjoi": 7, "split": 7, "yoursefl": 7, "jargon": 7, "syntax": [0, 2, 3, 4, 7], "second": [0, 2, 7], "discuss": [3, 4, 7], "consider": [5, 7], "debug": [7, 8], "lambda": [0, 5, 7, 8], "anonym": 7, "overload": [7, 8], "user": 7, "smart": 7, "manag": [4, 5, 7], "owndership": 7, "model": 7, "digress": [2, 7], "imper": 7, "orient": 7, "assign": [4, 7], "friend": 7, "handl": 7, "inspir": 7, "research": [2, 7], "physic": [2, 7], "opaqu": [2, 7], "necessari": [0, 2, 7], "ellucid": 7, "linear": [7, 8], "algebra": 7, "matrix": 7, "vector": [0, 2, 4, 7], "inner": 7, "product": 7, "reduct": 7, "written": [4, 5], "convert": [2, 5], "talk": [2, 4, 5], "behind": [4, 5], "scene": 5, "result": [2, 5], "hardwar": [4, 5], "mac": 5, "ingredi": [3, 4, 5], "uint": 5, "bundl": 5, "suffix": 5, "either": [2, 5], "sytstem": 5, "libc": 5, "via": 5, "packag": 5, "libopenbla": 5, "resolv": [2, 5], "e": [0, 2, 4, 5], "devic": 5, "hello": 5, "world": 5, "sentenc": 5, "known": [0, 4, 5], "stdout": 5, "endl": [2, 5], "infrastructur": [2, 5], "websit": 5, "snippet": 5, "side": [4, 5], "disassembl": 5, "reproduc": [4, 5], "lc0": [2, 5], "wolrd": [2, 5], "push": [2, 5], "rbp": [2, 5], "mov": [2, 5], "rsp": [2, 5], "esi": [2, 5], "offset": [2, 5], "flat": [2, 5], "edi": [2, 5], "_zst4cout": [2, 5], "basic_ostream": [2, 5], "char_trait": [2, 5], "_zst4endlicst11char_traitsiceerst13basic_ostreamit_t0_es6_": [2, 5], "rdi": [2, 5], "rax": [2, 5], "eax": [2, 5], "pop": [2, 5], "ret": [2, 5], "assembl": [2, 5], "exactli": [2, 5], "won": [2, 5], "valuabl": 5, "futur": [0, 4, 5], "thumb": 5, "fewer": 5, "better": 5, "notabl": 5, "instanc": 5, "clarif": 5, "instead": 5, "executor": 5, "accomplish": 5, "select": [0, 4, 5], "third": [5, 7], "column": 5, "screenshot": [4, 5], "were": 2, "dig": 7, "deeper": [], "read": [2, 4], "finish": [2, 3], "diagnos": 2, "why": [2, 4], "fail": 2, "techniqu": 1, "riemann": 1, "sum": 1, "midpoint": 1, "trapezoid": 1, "simpson": 1, "gaussian": 1, "quadratur": 1, "adapt": 1, "both": [1, 4], "collect": 2, "default": [0, 2], "oldest": 2, "highli": 2, "pronounc": 2, "lang": 2, "llvm": 2, "though": [2, 4], "maintain": 2, "top": 2, "infrastrucutr": 2, "fast": 2, "remark": [2, 4], "cl": 2, "microsoft": 2, "studio": 2, "msvc": 2, "tend": 2, "date": 2, "latest": 2, "subsystem": 2, "wsl2": 2, "relecut": 2, "evolv": 2, "cli": 2, "worthwhil": 2, "plenti": 2, "simplic": 2, "ubuntu": 2, "sudo": 2, "apt": 2, "ensur": [0, 2, 4], "spot": 2, "learning_scientific_comput": 2, "subfold": 2, "hello_world": 2, "eof": 2, "hello_word": 2, "quick": [0, 2], "under": [2, 4], "correspond": 4, "slightli": [], "longer": [2, 4], "__cxx_global_var_init": 2, "movab": 2, "__ioinit": 2, "ios_bas": 2, "init": 2, "constructor": [0, 2], "destructor": 2, "rsi": 2, "rdx": 2, "__dso_handl": 2, "__cxa_atexit": 2, "sub": 2, "16": [2, 4], "dword": 2, "ptr": 2, "str": 2, "xor": 2, "_global__sub_i_exampl": 2, "asciz": 2, "disect": [], "preprocess": 2, "involv": 2, "macro": 2, "occur": 2, "dead": 2, "bit": [2, 3, 4], "enclod": 2, "guard": 2, "evalu": [0, 2, 4], "tree": 2, "analyz": 2, "bug": 2, "miss": 2, "undeclar": 2, "lex": 2, "pars": 2, "ast": 2, "readibl": 2, "represent": 2, "regist": [], "transfer": 2, "intermedi": 2, "undergo": 2, "transform": 2, "gone": 2, "extrem": [2, 7], "onc": 2, "happi": 2, "architur": 2, "intel": 2, "chip": 2, "x86_64": 2, "appl": 2, "silicon": 2, "arm": 2, "togeth": 2, "cross": 2, "referenc": 2, "stack": 2, "lto": 2, "reduc": 2, "improv": [2, 4], "perform": 2, "situat": 2, "intricaci": 2, "assoic": [], "needn": 2, "associ": 2, "vari": 2, "equip": 2, "remot": [7, 8], "slurm": 7, "shape": 7, "graphic": 7, "card": 7, "mesag": 7, "massiv": 7, "parallel": 7, "independ": 7, "task": 7, "front": 7, "meant": 7, "yourself": [2, 7], "environ": 7, "connect": [7, 8], "server": [7, 8], "sycl": [], "koko": [], "amrex": [], "clarifi": 2, "plai": [2, 4], "directli": [2, 4], "architectur": 2, "manufactur": 2, "back": 2, "flavor": 2, "personn": 2, "x86": 2, "comman": 2, "commonli": 2, "seen": 2, "abouot": 2, "evolut": 2, "encourag": 2, "re": 2, "curiou": 2, "locat": 2, "load": 2, "ultim": [2, 4], "dictat": 2, "convent": 2, "prefix": 2, "64": [2, 4], "32": [2, 4], "accumul": 2, "registr": 2, "rbx": 2, "rcx": 2, "count": [2, 4], "loop": [0, 2], "index": [0, 2], "destin": 2, "bottom": 2, "r8": 2, "r15": 2, "xmm0": 2, "xm15": 2, "simd": 2, "resit": [], "arithmet": 2, "st0": 2, "st7": 2, "restructur": 2, "simpler": 2, "princip": 2, "invok": 2, "insertt": 2, "destroi": 2, "estim": 0, "finit": 0, "repeatedli": 0, "x_n": 0, "k": 0, "x_k": 0, "leq": 0, "x_": 0, "fraction": 0, "term": [0, 4], "slop": [], "accuraci": 0, "scheme": 0, "increas": 0, "bm": [], "interp": 0, "across": 2, "put": 2, "crash": 2, "segment": 2, "fault": 2, "deviat": 2, "assist": 2, "narrow": 2, "nice": 2, "increment": [2, 4], "envis": 2, "programm": 2, "usag": [2, 4], "adequ": 2, "lldb": 2, "backend": 2, "rabbit": 2, "final": 4, "semant": 4, "grammar": 4, "langaug": 4, "author": 4, "off": 4, "anolog": 4, "recip": [3, 4], "cake": [3, 4], "consist": 4, "analog": [3, 4], "egg": 4, "flour": 4, "sugar": 4, "cannot": [0, 4], "central": 4, "accept": 4, "true": [0, 4], "enumer": 4, "subsequ": 4, "strongli": 4, "moreov": 4, "anywher": 4, "tyep": 4, "primit": 4, "arguabl": 4, "summar": 4, "annot": 4, "support": 4, "descript": 4, "incomplet": 4, "empti": 4, "ascii": 4, "occupi": 4, "byte": 4, "8": 4, "integ": 4, "000": 4, "255": 4, "map": 4, "basi": 4, "wchar_t": 4, "utf": 4, "encod": 4, "cccupi": 4, "char8_t": 4, "char16_t": 4, "char32_t": 4, "long": [0, 4], "decim": 4, "storag": 4, "bool": [0, 4], "abbrevi": 4, "boolean": 4, "keyword": 4, "unsign": 4, "neg": 4, "respect": 4, "produc": 4, "fundament": 4, "g": 4, "occcupi": 4, "largest": 4, "sizeof": [0, 4], "godbolt": 4, "recal": [0, 4], "precis": 4, "sound": 4, "struct": 4, "postpon": 4, "1000": 4, "type_declar": 4, "variable_nam": 4, "intrinis": 4, "satisfi": 4, "followin": 4, "lower": [0, 4], "_": 4, "whitespac": 4, "valid": 4, "_fraction": 4, "flag_1": 4, "2_file": 4, "b": 4, "abolish": 4, "foo": 4, "favor": 4, "least": 4, "overhead": 4, "instanti": 4, "incur": 4, "unnecessari": 4, "pi": 4, "cpu_core_count": 4, "12": 4, "categori": 4, "distint": 4, "acquist": 4, "turn": 4, "nuanc": 4, "histor": 4, "appear": 4, "accord": 4, "whose": 4, "thing": 4, "alreai": 4, "baz": 4, "caveat": 4, "ignor": 4, "prvalu": 4, "xvalu": 4, "glvalu": 4, "delin": 4, "role": 4, "taxonomi": 4, "articl": 4, "encount": 4, "less": 4, "extern": 4, "volatil": 4, "throught": 4, "imho": 4, "low": 4, "embed": 4, "usecas": 4, "insid": 4, "chaper": 4, "visibl": 4, "outsid": [0, 4], "hide": 4, "reman": 4, "frequent": 4, "warn": 4, "stronger": 4, "durat": 4, "particularli": 4, "offload": 4, "dramat": 4, "speed": [0, 4], "000x": 4, "shine": 4, "paradigm": 4, "behav": 4, "util": 4, "introduct": 4, "typenam": [0, 4], "anyth": 4, "obei": 4, "deal": 4, "particular": 4, "metaprogam": 7, "algorithm": [0, 7], "queue": 7, "sort": 7, "concurr": 7, "disribut": 7, "multilinear": 7, "interpol": [7, 8], "random": 7, "slope": 0, "mathbf": 0, "credit": 0, "elia": 0, "skeleton": 0, "member": 0, "individu": 0, "rememb": 0, "cassert": 0, "fro": 0, "static_assert": 0, "switch": 0, "unique_point": 0, "forward": 0, "make_uniqu": 0, "simplest": 0, "incarn": 0, "dim": 0, "boo": [], "uniform": 0, "linearinterpol": 0, "vec": 0, "vecptr": 0, "unique_ptr": 0, "m_dim": [], "arg": 0, "contstuctor": [], "inlin": 0, "targ": [], "get_deriv": 0, "x_in": 0, "find_index": 0, "public": 0, "privat": 0, "m_input": 0, "m_delta_input": 0, "m_output": 0, "m_npoint": [], "primarili": 0, "length": [], "alias": 0, "avoid": 0, "implment": 0, "deriv": 0, "search": 0, "constexpr": 0, "num_point": 0, "constepxr": [], "temp": [], "assert": 0, "isnan": 0, "m_delta_output": [], "taken": [], "fold": 0, "over": 0, "pack": 0, "state": [], "m_num_point": 0, "strictli": 0, "num_arg": 0, "quantiti": [0, 3], "x_left": 0, "x_mid": 0, "upper": 0, "mid": 0, "unifi": 0, "action": 0, "simplifi": 0, "substanti": 0, "expos": 0, "implemet": 0, "sinc": 0, "ns": [], "printarrai": [], "explicit": 0, "fulli": 0, "reader": 0, "section": 3, "bake": 3, "juxtapos": 3, "bread": 3, "uniqu": 3, "perscript": 3, "oven": 3, "diagress": 3, "whatev": 3, "isn": 3, "variab": 3, "probabl": 3, "prominantli": 3, "rest": 3, "presenc": 4, "angl": 4, "bracket": 4, "treat": 4, "green": 4, "type_specifi": 4, "template_nam": 4, "concret": 4, "type_decalar": 4, "concrete_typ": 4}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"introduct": [7, 8], "c": [2, 7, 8], "program": 5, "syntax": [], "keyword": [], "function": 3, "more": [], "hello": 2, "world": 2, "file": [], "i": [], "o": [], "4": [], "text": [], "th": [], "order": [], "rung": [], "kutta": [], "The": 4, "command": 2, "line": [], "open": [], "termin": [], "four": [], "most": [], "basic": 8, "flag": [], "common": [], "posix": [], "less": [], "still": [], "us": [], "help": [], "document": [], "creat": [], "project": [7, 8], "get": [], "familiar": [], "compil": 2, "your": [], "first": [], "build": [], "system": [], "structur": [], "write": [], "script": [], "chapter": 7, "content": 7, "lesson": 7, "exampl": [7, 8], "learn": 8, "scientif": 8, "comput": [7, 8], "A": 8, "guid": 8, "high": [7, 8], "preform": [7, 8], "By": 8, "kevin": 8, "alex": 8, "ingl": 8, "tabl": [], "what": 5, "debug": 2, "debugg": 2, "disassembl": 2, "revisit": 2, "numer": 1, "integr": 1, "dig": 2, "littl": 2, "deeper": 2, "essenti": 7, "connect": 6, "remot": 6, "server": 6, "regist": 2, "type": [2, 4], "linear": 0, "interpol": 0, "background": 0, "valgrind": 2, "gbd": 2, "variabl": 4, "valu": 4, "templat": [3, 4], "intrins": 4, "user": 4, "defin": 4, "declar": 4, "rule": 4, "best": 4, "practic": 4, "name": 4, "lvalu": 4, "rvalu": 4, "categor": 4, "deriv": 4, "from": 4, "l": 4, "delcar": 4, "qualifi": 4, "static": 4, "specifi": 4, "const": 4, "constexpr": 4, "special": 4, "summari": 4, "implement": 0, "oper": 3, "lambda": 3, "express": 3, "overload": 3, "variad": 3}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinxcontrib.bibtex": 9, "sphinx": 56}})