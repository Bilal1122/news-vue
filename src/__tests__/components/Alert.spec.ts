// import { describe, it, expect } from 'vitest';
// import { mount } from "@vue/test-utils";
// import Alerts from '@/components/Alerts.vue'; // Update the import path

// describe('Alerts.vue', () => {
//   it('renders alerts correctly', async () => {
//     const alerts = [
//       { message: 'Error 1', type: 'error' },
//       { message: 'Warning 1', type: 'warning' },
//     ];

//     const onAlertClick = jest.fn();

//     const wrapper = mount(Alerts, {
//       props: {
//         alerts,
//         onAlertClick,
//       },
//     });

//     const alertElements = wrapper.findAll('.alert');
//     expect(alertElements.length).toBe(alerts.length);

//     await wrapper.trigger('click'); // Simulate a click on the alerts
//     expect(onAlertClick).toHaveBeenCalledTimes(alerts.length);
//   });

//   it('adjusts width on smaller screens', async () => {
//     const alerts = [
//       { message: 'Error 1', type: 'error' },
//       { message: 'Warning 1', type: 'warning' },
//     ];

//     const wrapper = mount(Alerts, {
//       props: {
//         alerts,
//         onAlertClick: jest.fn(),
//       },
//     });

//     await wrapper.setData({ isMobile: true }); // Simulate smaller screen

//     const alertElements = wrapper.findAll('.alert');
//     alertElements.forEach((alert) => {
//       const width = alert.element.style.width;
//       const maxWidth = alert.element.style.maxWidth;
//       expect(width).toBe('auto');
//       expect(maxWidth).toBe('80vw');
//     });
//   });
// });
