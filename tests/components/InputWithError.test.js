import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import InputWithError from '@/components/InputWithError.vue';

describe('InputWithError.vue', () => {
    it('renders an input if "type" is "text"', async () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'text',
                label: 'Test Label',
                inputId: 'test-id',
                placeholder: 'Enter text',
                task: 'task1',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'Some error',
                'onUpdate:error': (e) => wrapper.setProps({ error: e })
            },
        });

        console.log(wrapper.html())



        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('text');
        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('task1');

        const label = wrapper.find('label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Test Label');
        expect(label.attributes('for')).toBe('test-id');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('Some error');

    });
    it('renders an input if "type" is "date" and no errors', async () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'date',
                label: 'Test Label',
                inputId: 'test-id',
                min: "2018-01-01",
                placeholder: 'Enter text',
                task: '2018-01-02',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: '',
                'onUpdate:error': (e) => wrapper.setProps({ error: e })
            },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('date');
        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.attributes('min')).toBe("2018-01-01");
        expect(input.attributes('aria-invalid')).toBe("false");
        expect(input.element.value).toBe('2018-01-02');

        const label = wrapper.find('label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Test Label');
        expect(label.attributes('for')).toBe('test-id');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(false);

    });
    it('renders a textarea if "type" is "textarea"', () => {
        const wrapper = mount(InputWithError, {
            props: {
                type: 'textarea',
                label: 'Test Label',
                inputId: 'test-id',
                placeholder: 'Enter text',
                task: 'task1',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'Some error',
                'onUpdate:error': (e) => wrapper.setProps({ error: e })
            },
        });

        const input = wrapper.find('textarea');
        expect(input.exists()).toBe(true);
        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('task1');

        const label = wrapper.find('label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Test Label');
        expect(label.attributes('for')).toBe('test-id');

        const errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('Some error');
    });

    it.each([
        ["textarea"], ["text"]
    ])('(%s) test two way binds for the "task" and "error" works', async (input_type) => {

        const wrapper = mount(InputWithError, {
            props: {
                type: input_type,
                task: 'initial task',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'initial error',
                'onUpdate:error': (e) => wrapper.setProps({ error: e }),
            },
        });

        // before

        var input = input_type === 'textarea' ? wrapper.find('textarea') : wrapper.find('input');

        expect(input.exists()).toBe(true);
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('initial task');

        var errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('initial error');

        // make changes in parent
        await wrapper.setProps({
            task: "updated1",
            error: "updated1",
        });
        expect(wrapper.props('task')).toBe('updated1')
        expect(wrapper.vm.task).toBe('updated1');

        // assert changes in child : text and error updated
        expect(input.element.value).toBe('updated1');
        expect(input.attributes('aria-invalid')).toBe("true");

        expect(errorMsg.exists()).toBe(true);
        expect(wrapper.vm.error).toBe('updated1');

        // make changes in child
        await input.setValue("updated3")

        // assert changes in parent : text updated and error cleared
        expect(input.attributes('aria-invalid')).toBe("false");
        expect(wrapper.props('task')).toBe('updated3')
        expect(wrapper.vm.task).toBe('updated3');
        expect(wrapper.vm.error).toBe('');

    });

});
