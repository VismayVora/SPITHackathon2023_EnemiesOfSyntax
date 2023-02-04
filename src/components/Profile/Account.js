import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
export default function Account() {
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    console.log(user);
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Token ${user.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `http://127.0.0.1:8000/account/${
        user?.is_mentor ? 'mentor' : 'entrepreneur'
      }/`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log(JSON.parse(result)[0].startup);

        console.log('hello');
        setData(JSON.parse(result)[0]);
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <LinearGradient
          colors={[colors.primary, '#ADD8E6']}
          style={{width: '100%', height: 200, position: 'relative'}}>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              padding: 20,
              marginRight: 'auto',
              marginLeft: 'auto',
              top: 80,
              alignItems: 'center',
              elevation: 3,
              borderRadius: 10,
              width: '70%',
              alignSelf: 'center',
            }}>
            <Image
              source={{
                uri: data?.profile_pic
                  ? data?.profile_pic
                  : 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg',
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                color: 'black',
                marginTop: 20,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {user?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Entypo name="mail" size={22} color={colors.secondary} />
              <Text
                style={{
                  marginHorizontal: 10,
                  color: 'black',
                  fontSize: 16,
                }}>
                {user?.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome5
                name="birthday-cake"
                size={22}
                color={colors.secondary}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  color: 'black',
                  fontSize: 16,
                }}>
                19/09/2000
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={{marginTop: 160, paddingHorizontal: 30}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              elevation: 3,
              borderRadius: 20,
            }}>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                About
              </Text>
              <AntDesign name="edit" color={colors.primary} size={22} />
            </View>
            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={{fontWeight: '600', color: 'black', fontSize: 14}}>
                Experience:{' '}
              </Text>
              <View>
                {data?.experience?.map(exp => (
                  <View key={exp.id}>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={{color: 'black', fontWeight: '600'}}>
                        Company:{' '}
                      </Text>
                      <Text style={{color: 'black'}}> {exp.company_name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={{color: 'black', fontWeight: '600'}}>
                        Role:{' '}
                      </Text>
                      <Text style={{color: 'black'}}> {exp.job_title}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={{color: 'black', fontWeight: '600'}}>
                        Period :{' '}
                      </Text>
                      <Text style={{color: 'black'}}>
                        {' '}
                        {exp.start_date} - {exp.end_date}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={{color: 'black', fontWeight: '600'}}>
                        Location:{' '}
                      </Text>
                      <Text style={{color: 'black'}}> {exp.location}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={{color: 'black', fontWeight: '600'}}>
                        Industry:{' '}
                      </Text>
                      <Text style={{color: 'black'}}> {exp.industry}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={{fontWeight: '600', color: 'black', fontSize: 14}}>
                Education :{' '}
              </Text>
              {data?.education?.map(edu => (
                <View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      College :{' '}
                    </Text>
                    <Text style={{color: 'black'}}> {edu.institute}</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      Year :{' '}
                    </Text>
                    <Text style={{color: 'black'}}>
                      {edu.start_date.split('-')[0]} -{' '}
                      {edu.end_date.split('-')[0]}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      Course :{' '}
                    </Text>
                    <Text style={{color: 'black'}}>
                      {edu.degree} in {edu.study_field}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      Grade :{' '}
                    </Text>
                    <Text style={{color: 'black'}}>{edu.grade}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {user?.is_mentor ? null : (
            <>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  elevation: 3,
                  borderRadius: 20,
                  marginTop: 20,
                  marginBottom: 100,
                }}>
                <View
                  style={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    Startups
                  </Text>
                  <AntDesign name="edit" color={colors.primary} size={22} />
                </View>
                {data?.startup?.length <= 0 ? (
                  <Text
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                      fontSize: 16,
                    }}>
                    No Startups Added
                  </Text>
                ) : (
                  data?.startup?.map(s => (
                    <View>
                      <View
                        style={{
                          marginVertical: 10,
                          flexDirection: 'row',
                        }}>
                        <View style={{width: '80%', marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {s.legalNameOfBusiness}
                          </Text>
                          <Text style={{color: 'black'}}>
                            {s.principalPlaceOfBusinessAddress}
                          </Text>
                          <Text style={{color: 'black', fontWeight: '600'}}>
                            Type : {s.constitutionOfBusiness}
                          </Text>
                          <Text style={{color: 'black', fontWeight: '600'}}>
                            Date : {s.dateOfRegistration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
