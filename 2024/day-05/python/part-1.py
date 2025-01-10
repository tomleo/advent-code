"""
The notation X|Y means that if both page number X and page number Y are to be
produced as part of an update, page number X must be printed at some point
before page number Y

page ordering rules
pages to produce in each update
"""

class Rule:
    def __init__(self, raw_line):
        try:
            _x, _y = raw_line.split('|')
        except Exception as exp:
            import pdb; pdb.set_trace()
        self._x = _x
        self._y = _y
    
    @property
    def x(self):
        return self._x
    
    @property
    def y(self):
        return self._y

    @property
    def value(self):
        return (self._x, self._y)

    def __repr__(self):
        return f'({self.x},{self.y})'


class Page:
    def __init__(self, raw_line):
        self._value = raw_line.split(',')
    
    @property
    def value(self):
        return self._value
    
    def __repr__(self):
        return f'{self.value}'

    def __iter__(self):
        for item in self.value:
            yield item


def get_puzzle_input(fname):
    with open(fname, 'r+') as fin:
        raw_input = fin.read()
    page_ordering_rules_section = True
    page_ordering_rules = []
    pages = []
    for line in raw_input.split('\n'):
        if line == '':
            page_ordering_rules_section = False
            continue
        if page_ordering_rules_section:
            page_ordering_rules.append(Rule(line))
        else:
            pages.append(Page(line))
    pages_flag = [j for i in pages for j in i]
    return (page_ordering_rules, pages_flag)

def is_valid_page(rules, page):
    # 75,47,61,53,29
    for 

def filter_rows(rules, pages):
    return [page for page in pages if is_valid_page(rules, page)]


if __name__ == '__main__':
    rules, pages = get_puzzle_input('./example_puzzle_input.txt')
    print(rules)
    print(pages)

    filtered_output = [
        [75,47,61,53,29],
        [97,61,53,29,13],
        [75,29,13],
    ]
