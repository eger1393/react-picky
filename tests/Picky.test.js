import React from 'react';
import { mount } from 'enzyme';
import Placeholder from '../src/Placeholder';
import Picky from '../src/Picky';
import Filter from '../src/Filter';
import Option from '../src/Option';

const sel = id => `[data-test="${id}"]`;

describe('Picky', () => {
  it('should select initial values on load', () => {
    const wrapper = mount(<Picky value={[1, 2, 3]} multiple />);
    expect(wrapper.state('selectedValue')).toEqual([1, 2, 3]);
  });

  it('should have Placeholder component', () => {
    const wrapper = mount(<Picky value={[]} />);
    expect(wrapper.find(Placeholder)).toHaveLength(1);
  });

  it('should accept render prop', () => {
    const renderPropMock = jest.fn();
    renderPropMock.mockReturnValue(<p />);
    const wrapper = mount(
      <Picky
        value={[1, 2, 3]}
        options={[1, 2, 3, 4, 5]}
        open={true}
        render={renderPropMock}
      />
    );

    expect(wrapper.prop('render')).toBeDefined();
    expect(renderPropMock).toHaveBeenCalled();
  });

  describe('Virtual Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={false} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });

    it('should open on click of button', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should open on click of button (open by prop)', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });
    it('should have items', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      expect(wrapper.find('.picky__dropdown .option')).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      const selected = wrapper.find('.picky__dropdown .option.selected');
      expect(selected).toHaveLength(3);
      expect(selected.at(0).text()).toEqual('1');
      expect(selected.at(1).text()).toEqual('2');
      expect(selected.at(2).text()).toEqual('3');
    });
    it('should show placeholder if value is an array and none selected', () => {
      const wrapper = mount(
        <Picky value={[]} options={[1, 2, 3, 4, 5]} open={true} multiple />
      );

      expect(wrapper.find('.picky__placeholder').text()).toEqual(
        'None selected'
      );
    });
    it('should show correct placeholder with selected value, single select', () => {
      const wrapper = mount(
        <Picky
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
        />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1');
    });
    it('should show correct placeholder with selected value, multi select', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1, 2, 3');

      const nextWrapper = mount(
        <Picky
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(nextWrapper.find('.picky__placeholder').text()).toEqual(
        '3 selected'
      );
    });
  });
  describe('Plain Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={true} virtual={false} />
      );
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={false} virtual={false} />
      );
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });

    it('should open on click of button', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should open on click of button (open by prop)', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={true} virtual={false} />
      );
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });
    it('should have items', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          virtual={false}
        />
      );
      expect(wrapper.find('.picky__dropdown .option')).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          virtual={false}
        />
      );
      const selected = wrapper.find('.picky__dropdown .option.selected');
      expect(selected).toHaveLength(3);
      expect(selected.at(0).text()).toEqual('1');
      expect(selected.at(1).text()).toEqual('2');
      expect(selected.at(2).text()).toEqual('3');
    });
    it('should show placeholder if value is an array and none selected', () => {
      const wrapper = mount(
        <Picky
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          virtual={false}
        />
      );

      expect(wrapper.find('.picky__placeholder').text()).toEqual(
        'None selected'
      );
    });
    it('should show correct placeholder with selected value, single select', () => {
      const wrapper = mount(
        <Picky
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
          virtual={false}
        />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1');
    });
    it('should show correct placeholder with selected value, multi select', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          virtual={false}
        />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1, 2, 3');

      const nextWrapper = mount(
        <Picky
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          virtual={false}
        />
      );
      expect(nextWrapper.find('.picky__placeholder').text()).toEqual(
        '3 selected'
      );
    });
  });

  describe('Selecting', () => {
    it('should accept includeSelectAll option', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(
        wrapper.find('.picky__dropdown .option[data-selectall="true"]')
      ).toHaveLength(1);
    });

    it('should have "select all" text when no selectAllText prop provided', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(
        wrapper
          .find(sel('select-all-text'))
          .text()
          .toLowerCase()
      ).toEqual('Select All'.toLowerCase());
    });
    it('should support select all text with selectAllText prop', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          selectAllText="Select em all"
        />
      );
      expect(
        wrapper
          .find(sel('select-all-text'))
          .text()
          .toLowerCase()
      ).toEqual('Select em all'.toLowerCase());
    });

    it('should select all options when select all is clicked', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          onChange={onChange}
        />
      );
      const selectAllItem = wrapper
        .find('.picky__dropdown .option[data-selectall="true"]')
        .first();

      expect(wrapper.find('.picky__dropdown .option.selected')).toHaveLength(3);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(5);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(0);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
    });

    it('should select single value controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={1}
          options={[1, 2, 3, 4, 5]}
          open={true}
          onChange={onChange}
        />
      );
      expect(wrapper.state('selectedValue')).toEqual(1);
      wrapper
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith(2);
    });

    it('should select single value uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky options={[1, 2, 3, 4, 5]} open={true} onChange={onChange} />
      );
      expect(wrapper.state('selectedValue')).toEqual(null);
      wrapper
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith(2);
    });
    it('should select multiple value controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([]);
      wrapper
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([2]);
      expect(wrapper.state('selectedValue')).toEqual([2]);
    });
    it('should select multiple value uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([]);
      wrapper
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([2]);
      expect(wrapper.state('selectedValue')).toEqual([2]);
    });

    it('should deselect multiple value', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[2]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([2]);
      wrapper
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([]);
      expect(wrapper.state('selectedValue')).toEqual([]);
    });

    it('should support object options single select', () => {
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ];
      const wrapper = mount(
        <Picky
          value={null}
          options={options}
          open={true}
          valueKey="id"
          labelKey="name"
        />
      );

      wrapper
        .find('.picky__dropdown .option')
        .at(0)
        .simulate('click');

      expect(wrapper.state('selectedValue')).toEqual({ id: 1, name: 'Item 1' });
    });
  });

  describe('Filter', () => {
    it('should accept includeFilter prop', () => {
      const wrapper = mount(<Picky includeFilter={true} value={[]} />);
      expect(wrapper.prop('includeFilter')).toEqual(true);
    });

    it('should have filter component', () => {
      const wrapper = mount(
        <Picky includeFilter={true} open={true} value={[]} />
      );
      expect(wrapper.find(Filter)).toHaveLength(1);
    });

    it('should call onFilterChange prop when text has changed', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Filter onFilterChange={onChange} />);
      const event = { target: { value: '123' } };
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(onChange).toHaveBeenCalledWith('123');
    });

    it('should filter values', () => {
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
        />
      );
      const event = { target: { value: '1' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([1]);
    });

    it('shouldnt filter if filter query is blank or empty string', () => {
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
        />
      );
      const event = { target: { value: '   ' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([]);
    });

    it('should filter object arrays', () => {
      const options = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 3' }];
      const wrapper = mount(
        <Picky
          options={options}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          labelKey="name"
          valueKey="id"
        />
      );

      const event = { target: { value: '1' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([
        {
          id: 1,
          name: 'Item 1'
        }
      ]);
    });
  });

  describe('Callbacks', () => {
    it('should call onFiltered callback', () => {
      const onFilteredMock = jest.fn();
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onFiltered={onFilteredMock}
        />
      );

      const event = { target: { value: '1' } };
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(onFilteredMock).toHaveBeenCalledWith([1]);
    });

    it('should call onOpen', () => {
      const onOpenMock = jest.fn();
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={false}
          includeFilter={true}
          onOpen={onOpenMock}
        />
      );

      wrapper.find('.picky__input').simulate('click');
      expect(onOpenMock).toHaveBeenCalled();
    });
    it('should call onClose', () => {
      const onCloseMock = jest.fn();
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onClose={onCloseMock}
        />
      );

      wrapper.find('.picky__input').simulate('click');
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  xit('should close when clicked outside of component', () => {
    //Can't figure out how to test this
    // const wrapper = mount(<Picky open={true} options={[1, 2, 3]} />);
    // wrapper.mount();
    // expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    // wrapper.instance().handleOutsideClick({ target: '#root' });
    // expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
  });
  it('should select option on keyPress', () => {
    const keyPressMock = jest.fn();
    const wrapper = mount(
      <Option id="option" item={1} selectValue={keyPressMock} />
    );
    wrapper.simulate('keyPress', {});
    expect(keyPressMock).toHaveBeenCalledWith(1);
  });

  it('cellmeasurercache should use itemHeight prop if supplied', () => {
    const wrapper = mount(<Picky options={[1, 2, 3]} itemHeight={60} />);
    expect(wrapper.instance().cellMeasurerCache.defaultHeight).toEqual(60);
  });

  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const wrapper = mount(
      <Picky
        options={[]}
        virtual={false}
        open={true}
        includeSelectAll={true}
        multiple={true}
      />
    );
    const dropdown = wrapper.find(sel('dropdown')).first();
    expect(dropdown.find(sel('select-all-text'))).toHaveLength(1);
  });
  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const renderSelectAllMock = jest.fn();
    const wrapper = mount(
      <Picky
        options={[1, 2, 3, 4]}
        virtual={false}
        open={true}
        includeSelectAll={true}
        multiple={true}
        renderSelectAll={renderSelectAllMock}
      />
    );
    const calledWithProps = renderSelectAllMock.mock.calls[0][0];
    expect(calledWithProps.filtered).toEqual(false);
    expect(calledWithProps.multiple).toEqual(true);
    expect(calledWithProps.allSelected).toEqual(false);
    expect(calledWithProps.tabIndex).toEqual(0);

    // expect(renderSelectAllMock).toHaveBeenCalledWith({
    //   filtered: false,
    //   includeSelectAll: true,
    //   multiple: true,
    //   allSelected: false,
    //   toggleSelectAll: () => {},
    //   tabIndex: 0
    // });
  });

  describe('Regressions', () => {
    describe('Issue #36', () => {
      it('should highlight selected items, isSelected should be true', () => {
        const items = Array.from(Array(10).keys()).map(v => {
          return {
            id: v + 1,
            name: `Label ${v + 1}`
          };
        });
        const wrapper = mount(
          <Picky
            multiple={true}
            open={true}
            options={items}
            value={[
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' },
              { id: 3, name: 'Item 3' },
              { id: 4, name: 'Item 4' },
              { id: 5, name: 'Item 5' }
            ]}
            labelKey="name"
            valueKey="id"
          />
        );
        const renderedOptions = wrapper.find(sel('option'));
        expect(wrapper.state('selectedValue')).toHaveLength(5);
        expect(renderedOptions).toHaveLength(10);

        expect(renderedOptions.first().prop('aria-selected')).toEqual(true);
      });
    });
  });
});
