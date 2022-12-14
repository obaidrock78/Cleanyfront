const user = JSON.parse(window.localStorage.getItem('user'));
export const navigations =
  user.role === 'Customer'
    ? [
        { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
        { label: 'PAGES', type: 'label' },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
        { label: 'PAGES', type: 'label' },
        {
          name: 'Bookings',
          icon: 'import_contacts_outlined_icon',
          children: [
            {
              name: 'Booking Appointments',
              iconText: 'CP',
              path: '/dashboard/booking-appointments',
            },
          ],
        },
        {
          name: 'Dispatcher',
          path: '/dashboard/dispatcher',
          icon: 'format_list_bulleted_outlined_icon',
        },
        {
          name: 'Customers',
          icon: 'sensor_occupied_outlined_icon',
          children: [{ name: 'All Customers', iconText: 'CP', path: '/dashboard/customers' }],
        },
        {
          name: 'Service Provider',
          icon: 'engineering_icon',
          children: [
            { name: 'All Service Providers', iconText: 'CP', path: '/dashboard/service-providers' },
          ],
        },
        { name: 'Services', path: '/dashboard/services', icon: 'widgets_outlined_icon' },
        {
          name: 'Settings',
          icon: 'settings_icon',
          children: [
            { name: 'Company Profile', iconText: 'CP', path: '/dashboard/company' },
            { name: 'Tax', iconText: 'T', path: '/dashboard/tax' },
          ],
        },
      ];
