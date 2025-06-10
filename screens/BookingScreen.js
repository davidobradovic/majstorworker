import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import twrnc from 'twrnc';

const DAYS = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
const MONTHS = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
  'Jul', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
];

// Generate dummy data for demonstration
const generateMockAppointments = (date) => {
  // Use seed based on date to generate consistent but random-looking data
  const seed = date.getDate() + (date.getMonth() * 31);
  
  // Generate 0-3 appointments per day based on seed
  const count = seed % 4;
  const appointments = [];
  
  for (let i = 0; i < count; i++) {
    const hourStart = 9 + ((seed + i) % 8); // Hours between 9-16
    const hourEnd = hourStart + 1 + (i % 2);
    
    const types = ['Sastanak', 'Termin', 'Poziv', 'Usluga'];
    const names = ['Ognjen Ogi', 'David Obradović', 'John Doe', 'Elon Musk', 'Faćo'];
    
    appointments.push({
      id: `${date.toDateString()}-${i}`,
      title: types[(seed + i) % types.length],
      client: names[(seed + i) % names.length],
      startTime: `${hourStart}:00`,
      endTime: `${hourEnd}:00`,
      color: [
        twrnc`bg-blue-500`.backgroundColor, 
        twrnc`bg-green-500`.backgroundColor,
        twrnc`bg-purple-500`.backgroundColor, 
        twrnc`bg-orange-500`.backgroundColor
      ][(seed + i) % 4],
    });
  }
  
  return appointments;
};

const CalendarHeader = ({ currentDate, activeView, onViewChange, onDateChange }) => {
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    
    if (activeView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (activeView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    
    onDateChange(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    
    if (activeView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (activeView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    onDateChange(newDate);
  };
  
  const goToToday = () => {
    onDateChange(new Date());
  };
  
  let dateTitle = '';
  if (activeView === 'day') {
    dateTitle = `${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  } else if (activeView === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      dateTitle = `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${currentDate.getFullYear()}`;
    } else {
      dateTitle = `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTHS[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${currentDate.getFullYear()}`;
    }
  } else {
    dateTitle = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }
  
  return (
    <View>
      <Text style={twrnc`text-lg font-semibold text-gray-800 dark:text-white pt-4 text-center`}>{dateTitle}</Text>
      <View style={twrnc`bg-white dark:bg-gray-800 p-4 flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700`}>
        <View style={twrnc`flex-row items-center gap-2`}>
          {/* <TouchableOpacity onPress={goToToday} style={twrnc`px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700`}>
            <Text style={twrnc`text-blue-500 dark:text-blue-400 font-medium`}>Today</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={goToPrevious} style={twrnc`p-1`}>
            <Ionicons name="chevron-back" size={24} style={twrnc`text-gray-600 dark:text-gray-400`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNext} style={twrnc`p-1`}>
            <Ionicons name="chevron-forward" size={24} style={twrnc`text-gray-600 dark:text-gray-400`} />
          </TouchableOpacity>
          {/* <Text style={twrnc`text-lg font-semibold text-gray-800 dark:text-white ml-2`}>{dateTitle}</Text> */}
        </View>
        
        <View style={twrnc`flex-row bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden`}>
          <TouchableOpacity onPress={goToToday} style={twrnc`px-3 pt-1.5 rounded-full bg-gray-100 dark:bg-gray-700`}>
            <Text style={twrnc`text-blue-500 dark:text-blue-400 font-medium`}>Danas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              twrnc`px-3 py-1.5`,
              activeView === 'day' ? twrnc`bg-white dark:bg-gray-600 shadow` : null
            ]}
            onPress={() => onViewChange('day')}
          >
            <Text style={[
              twrnc`font-medium`,
              activeView === 'day' ? twrnc`text-blue-500` : twrnc`text-gray-600 dark:text-gray-300`
            ]}>Dan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              twrnc`px-3 py-1.5`,
              activeView === 'week' ? twrnc`bg-white dark:bg-gray-600 shadow` : null
            ]}
            onPress={() => onViewChange('week')}
          >
            <Text style={[
              twrnc`font-medium`,
              activeView === 'week' ? twrnc`text-blue-500` : twrnc`text-gray-600 dark:text-gray-300`
            ]}>Sedmica</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              twrnc`px-3 py-1.5`,
              activeView === 'month' ? twrnc`bg-white dark:bg-gray-600 shadow` : null
            ]}
            onPress={() => onViewChange('month')}
          >
            <Text style={[
              twrnc`font-medium`,
              activeView === 'month' ? twrnc`text-blue-500` : twrnc`text-gray-600 dark:text-gray-300`
            ]}>Mesec</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DayView = ({ currentDate, onEventPress }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  const currentDateStr = currentDate.toDateString();
  const appointments = generateMockAppointments(currentDate);
  
  // Map appointments to their hour slots for positioning
  const appointmentsByHour = {};
  appointments.forEach(appointment => {
    const hour = parseInt(appointment.startTime.split(':')[0]);
    if (!appointmentsByHour[hour]) {
      appointmentsByHour[hour] = [];
    }
    appointmentsByHour[hour].push(appointment);
  });

  return (
    <ScrollView style={twrnc`flex-1 bg-white dark:bg-gray-900`}>
      <View style={twrnc`p-4 border-b border-gray-200 dark:border-gray-800`}>
        <Text style={twrnc`text-lg font-bold text-gray-800 dark:text-white`}>
          {DAYS[currentDate.getDay()]}, {MONTHS[currentDate.getMonth()]} {currentDate.getDate()}
        </Text>
      </View>
      
      <View style={twrnc`border-l border-gray-200 dark:border-gray-800 ml-16`}>
        {hours.map((hour) => {
          
          const currentHourAppointments = appointmentsByHour[hour] || [];
          
          return (
            <View key={hour} style={twrnc`flex-row border-b border-gray-200 dark:border-gray-800`}>
              <View style={twrnc`w-16 pr-2 py-3 -ml-16`}>
                <Text style={twrnc`text-right text-xs text-gray-500 dark:text-gray-400`}>{hour}</Text>
              </View>
              <View style={twrnc`flex-1 min-h-16 pl-2 py-1`}>
                {currentHourAppointments.map((appointment) => (
                  <TouchableOpacity
                    key={appointment.id}
                    style={[
                      twrnc`p-2 my-0.5 rounded`,
                      { backgroundColor: appointment.color }
                    ]}
                    onPress={() => onEventPress(appointment)}
                  >
                    <Text style={twrnc`text-white font-medium`}>{appointment.title}</Text>
                    <Text style={twrnc`text-white text-xs`}>
                      {appointment.startTime} - {appointment.endTime} • {appointment.client}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const WeekView = ({ currentDate, onEventPress }) => {

  const startOfWeek = new Date(currentDate);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  startOfWeek.setDate(diff);
  
  // Create array for days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
  
  // Get all appointments for the week
  const weekAppointments = weekDays.map(day => {
    return {
      date: day,
      appointments: generateMockAppointments(day)
    };
  });
  
  return (
    <View style={twrnc`flex-1 bg-white dark:bg-gray-900`}>
      {/* Days header */}
      <View style={twrnc`flex-row border-b border-gray-200 dark:border-gray-800`}>
        <View style={twrnc`w-16`} />
        {weekDays.map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <View key={index} style={twrnc`flex-1 p-2 items-center`}>
              <Text style={twrnc`text-xs text-gray-500 dark:text-gray-400`}>{DAYS[day.getDay()]}</Text>
              <View style={[
                twrnc`h-8 w-8 rounded-full items-center justify-center mt-1`,
                isToday ? twrnc`bg-blue-500` : null
              ]}>
                <Text style={[
                  twrnc`font-medium`,
                  isToday ? twrnc`text-white` : twrnc`text-gray-800 dark:text-white`
                ]}>
                  {day.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Times and appointments */}
      <ScrollView style={twrnc`flex-1`}>
        <View style={twrnc`flex-row`}>
          {/* Time labels */}
          <View style={twrnc`w-16`}>
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
              return (
                <View key={hour} style={twrnc`h-16 justify-center pr-2`}>
                  <Text style={twrnc`text-right text-xs text-gray-500 dark:text-gray-400`}>{hour}</Text>
                </View>
              );
            })}
          </View>
          
          {/* Day columns with appointments */}
          <View style={twrnc`flex-1 flex-row`}>
            {weekAppointments.map((dayData, dayIndex) => {
              return (
                <View key={dayIndex} style={twrnc`flex-1 border-l border-gray-200 dark:border-gray-800`}>
                  {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
                    const hourAppointments = dayData.appointments.filter(
                      app => parseInt(app.startTime.split(':')[0]) === hour
                    );
                    
                    return (
                      <View 
                        key={hour} 
                        style={twrnc`h-16 border-b border-gray-200 dark:border-gray-800 px-0.5`}
                      >
                        {hourAppointments.map((appointment) => (
                          <TouchableOpacity
                            key={appointment.id}
                            style={[
                              twrnc`p-1 rounded my-0.5`,
                              { backgroundColor: appointment.color }
                            ]}
                            onPress={() => onEventPress(appointment)}
                          >
                            <Text 
                              numberOfLines={1} 
                              style={twrnc`text-white text-xs font-medium`}
                            >
                              {appointment.title}
                            </Text>
                            <Text 
                              numberOfLines={1} 
                              style={twrnc`text-white text-xs`}
                            >
                              {appointment.startTime}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const MonthView = ({ currentDate, onEventPress, onDayPress }) => {
  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Calculate how many days we need to show from the previous month
  const daysFromPrevMonth = firstDayOfWeek;
  
  // Calculate how many days we need to show from the next month to complete the grid
  const totalDaysToShow = 42; // 6 rows of 7 days
  const daysFromNextMonth = totalDaysToShow - (daysFromPrevMonth + lastDayOfMonth.getDate());
  
  // Create an array of all dates to display
  const allDates = [];
  
  // Add days from previous month
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i);
    allDates.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === new Date().toDateString(),
      appointments: generateMockAppointments(date)
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    allDates.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === new Date().toDateString(),
      appointments: generateMockAppointments(date)
    });
  }
  
  // Add days from next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    allDates.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === new Date().toDateString(),
      appointments: generateMockAppointments(date)
    });
  }
  
  return (
    <View style={twrnc`flex-1 bg-white dark:bg-gray-900`}>
      {/* Days of week header */}
      <View style={twrnc`flex-row py-2 border-b border-gray-200 dark:border-gray-800`}>
        {DAYS.map((day, index) => (
          <View key={index} style={twrnc`flex-1 items-center`}>
            <Text style={twrnc`text-sm font-medium text-gray-600 dark:text-gray-400`}>{day}</Text>
          </View>
        ))}
      </View>
      
      {/* Calendar grid */}
      <ScrollView contentContainerStyle={twrnc`flex-grow flex-1`}>
        <View style={twrnc`flex-row flex-wrap flex-1`}>
          {allDates.map((dateObj, index) => {
            
            const { date, isCurrentMonth, isToday, appointments } = dateObj;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  twrnc`w-1/7 aspect-square p-1 border-b border-r border-gray-200 dark:border-gray-800 min-h-1/6`,
                  index % 7 === 0 ? twrnc`border-l` : null
                ]}
                onPress={() => onDayPress(date)}
              >
                <View style={twrnc`flex-1`}>
                  {/* Date number */}
                  <View style={twrnc`items-center justify-center h-6 w-6 mb-1`}>
                    <View style={[
                      isToday ? twrnc`rounded-full bg-blue-500 h-6 w-6 items-center justify-center` : null
                    ]}>
                      <Text style={[
                        isCurrentMonth 
                          ? twrnc`font-medium text-gray-800 dark:text-white` 
                          : twrnc`text-gray-400 dark:text-gray-600`,
                        isToday ? twrnc`text-white` : null
                      ]}>
                        {date.getDate()}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Appointment indicators */}
                  <View style={twrnc`flex-1`}>
                    {appointments.slice(0, 2).map((appointment, appIndex) => (
                      <TouchableOpacity
                        key={appIndex}
                        style={[
                          twrnc`rounded px-1 py-0.5 mb-0.5`,
                          { backgroundColor: appointment.color }
                        ]}
                        onPress={() => onEventPress(appointment)}
                      >
                        <Text 
                          numberOfLines={1} 
                          style={twrnc`text-white text-xs font-medium`}
                        >
                          {appointment.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    
                    {appointments.length > 2 && (
                      <Text style={twrnc`text-xs text-gray-500 dark:text-gray-400`}>
                        +{appointments.length - 2} more
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <View style={[twrnc`absolute inset-0 bg-black bg-opacity-50 justify-center items-center p-6 z-10`]}>
      <Pressable style={twrnc`absolute inset-0`} onPress={onClose} />
      <View style={twrnc`bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6`}>
        <View style={twrnc`flex-row justify-between items-center mb-4`}>
          <Text style={twrnc`text-xl font-bold text-gray-900 dark:text-white`}>{event.title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} style={twrnc`text-gray-500 dark:text-gray-400`} />
          </TouchableOpacity>
        </View>

        <View style={twrnc`mb-4`}>
          <View style={twrnc`flex-row items-center mb-2`}>
            <Ionicons name="time-outline" size={20} style={twrnc`text-gray-600 dark:text-gray-300 mr-2`} />
            <Text style={twrnc`text-gray-700 dark:text-gray-300`}>
              {event.startTime} - {event.endTime}
            </Text>
          </View>
          
          <View style={twrnc`flex-row items-center`}>
            <Ionicons name="person-outline" size={20} style={twrnc`text-gray-600 dark:text-gray-300 mr-2`} />
            <Text style={twrnc`text-gray-700 dark:text-gray-300`}>{event.client}</Text>
          </View>
        </View>

        <View style={twrnc`flex-row justify-end mt-4`}>
          <TouchableOpacity 
            style={twrnc`bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 mr-2`}
            onPress={onClose}
          >
            <Text style={twrnc`text-gray-700 dark:text-gray-300 font-medium`}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[twrnc`rounded-lg px-4 py-2`, { backgroundColor: event.color }]}
            onPress={onClose}
          >
            <Text style={twrnc`text-white font-medium`}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BookingScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
  };

  const handleDayPress = (date) => {
    setCurrentDate(date);
    setActiveView('day');
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const renderCalendarView = () => {
    switch (activeView) {
      case 'day':
        return <DayView currentDate={currentDate} onEventPress={handleEventPress} />;
      case 'week':
        return <WeekView currentDate={currentDate} onEventPress={handleEventPress} />;
      case 'month':
        return (
          <MonthView 
            currentDate={currentDate} 
            onEventPress={handleEventPress} 
            onDayPress={handleDayPress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[ twrnc`flex-1`,  { minHeight: 700 } ]}>
      <View style={twrnc`flex-1 bg-white dark:bg-gray-900`}>

        <CalendarHeader 
          currentDate={currentDate}
          activeView={activeView}
          onViewChange={handleViewChange}
          onDateChange={handleDateChange}
        />
        
        {renderCalendarView()}
        
        {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />}
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;