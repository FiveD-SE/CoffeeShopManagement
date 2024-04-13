import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons';

export default function Example() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F7FA' }}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 60 }]}>
            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}>
                <Image
                  alt="avatar"
                  source={{
                    uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMVFhUXFRgVFRUVFRUVFRUVFhUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFS0dHR0rLS0tLS0tKy0rKy0tLS0tLS0tKy0tKy0tLS0tLSstKy0tLS03NystLS0tKzctLS03Lf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEHAAj/xABAEAABAgMCDQIEBAYCAQUAAAABAAIDBBEhMQUGEiJBYXGBkaGxwfBR0RMjMuFCYnLxFDNSorLCJHOSNGOCs9L/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACERAQEAAgMAAwEAAwAAAAAAAAABAhEDITESQVFhEyIy/9oADAMBAAIRAxEAPwBhRfUU6LuSuJ0KiFwBWlqiGoAuXajGtVUsxFZKQRAUgF2i6gOOXAvnrjVpCWKMO923/ULuhRh3u2/6hAFwrgpFRh3BdKAkFwr4LhRAt91AlTHc9VWVRLpa/cr33lDyt52Ik3lVCUuC60LrgutCA6Au0XQF8mEHBXUVbvOKuogMVkruSrxCUhDXOsMWqGTajfhKt0K1AHSsOxXFqJl4GaFCI1IB6L6imQo0TCt64FOIFEKoSWhQZedv+oUnOAFqRx8ZoDHEVLrfwiugDSR6J05NtLDuC6UklcZYBArlt2tNP7aprLzbH2scHDUeo0IFlEBc0711c0jaglg7nqqyrG+/VVqiWS152DuiGm13mhDy952Dur2H6tvZOE+cpAL5SATD4LtF0L4pwIu9uoV9FTS7zSESqIDEwI4aCh3YMI0IU4ajMh5Qe6odS0k+ugphBxgiaaHaB2XN/qrdD/wBVExJEaNKfwMKNdexu6xXzHwsgucCABUkEGnFGp9UfL+BHQKN3IGM1OpojQlMcKDgBwUVY8KCZq4lyS4bw22AKDOeRY301lGYdwgIMIu0mxo9T7LzyYjFxLnGrjaSfUp3LSscd9o4SxpmXBzS/NNhAa0c6VSKKa51STpqdPqiJxtSPLfKquXki5EraT8Xyk84HTTansnhFwIc0mo9LDw07qpVL4Oom0vK1GsKdq+LW4GxkD6NiEV0OH+w7rQh1o2rzN0MtNRf1WqxYwnlUhuNo+nZS5XKxzw13GnablWpMNg2KAK0YrZe87lfD/Ft7KiWvO5WwjftThLQphVi9WhUHQvqLoC7ROEjS0bUTRUAWjb2KIomVYyO35R/UrYRX0VvyXfqH+qjBuGxctUaSbkThuZyZaJrYRyQUu6iHw7GrCePyu6FIHcKZq0bFTFcgZKLmjYry9GlovVZCkSq4z6An0FUBisbI5fFLfwsFBtvd2CzrhZ556JjNxMrKPqa8TUINw0elP2UTt0yamgEaFaPPPummC5TN3dwqGQqnz0WiwTL2HZ91SoG/hbLtJG42jmSiYMGlDuPYo9rAKhUv0genNGlbBTcKhQEGOYbw4WUNdhFqIwrMOc0ZA2uPQJPEJbSrqk31vBBs6JxGT1KRmA+G1w0t8CsBWcxOnMqG5lbrRsPg4rQMK1jls1RMqb9o6K6CbDt7qiVN+3srYJs391UQtabUS1CsvRTFUCQC7RdC+VJrjRaPPVE0VDfqCIQTJPb8l//AMf9VTL3DYOiKArBifpafOCFlvpGwLnyXBLSgsKuqx36T0KLQU9a12w9FMAuRdmjYEXVASJzW7B0RoQp1C4UdSFEP5HdCikBhw/IifpKDnrz8mrTuXzm28eikwWcORUHOpXYVMjo2lLWE7erfsmkhP0NAC40Fg1tPskDXFzngetN1tOqcwooloIc1hdFfcBeSGk8gD7G5X/D30tgxozolDRotFL7iDRPsHYKiPyXUuBBruIPXks3i7MOjl78s5TS0tyWZrsoDKBBobD+KtL7LLfS5NpaxppSrc4X0OlFhzLcYPGKXdCh5LA4kuDCW0ygDfkj1oCN9UiOBnvhMJhlsUE1dShc00Iy/wCo2uHBepTMuMqvqvjJspciX6TZuvPMVYphxch15BaevMgLdQysfjNC+FMsc2yorvB/ZaiA+oqqjLknZjKmw7eysg/Tv7oeUObvKugHNG1XGNXQ70bDQEM2o+EqhJhdovguqifQ/qG/siFRC+rzUiFUJl4DfkRP+tvIH2QUr9IR8p/If/015OQEoc0b+pXNkqLihJkWHYeiLKGje6n7NOQ+hv6R0RoQUh9DP0jojWoU6gcND5MT9J6VRyHwg2sN49WO6FI486huu3dShYr+3IhX1+ndyJCBiOzTv6fcIjcXivR0ZzdY6VW+GA2vLXW1F2qt68qwBPfCnDU2PIHABvZewYNnLL1dh40wwfgprBQCzy9MY7gGqmBHquxxlCiZ2BWkOaQTSiplJgOqAa0NOCqjYNdUvMR130igaKbr0I2cgwqtDgp1od3whx+vhHWex7JngmJWEw6qcLOyz2OsxlZG0kcPum2LcWsIaj7FOMc2hlDm8eqvlzmjb2QsocziiIBzW+aCrjFbCKYwbktgpjBuVwquCkohSCaXYIzjsRCogfUdncq9VAzEh/KcP/YPcJdJHNG/qUfgo5jv+p4/uSyRObvK5s/pUFuVD1aSqXKTWSH0M/SOiLag5A5jf0hFtKKaahFbUU3KVVFxQbzOI2jg06CRzSyILHbununuGYWTGd+s87e6SR/ppt4D9kRvCiLPQmlzYjXVrWoFa2ClLbCtjibjI2K3JJo5t7TfTQ4eqwGGGZ58tCJxXPzhrHMaVr18dp7290lJpH/xNAsPg7CD2UDrR66U/l58O0rPaw+GJqLFzf5bNdpdwsSuDg3Oys5xH4nWcALAtOx7Del+HcNQYEMue4NAFnqT6AaTqR61/wAusdMHjFNZUyIdfpZU7SRT/E8Vo8UYlYZGznVefS8yYsd8U2ZRJ2C4DgAtxie6xw1Dzmm58vGxlTmcURAOa3zQhJU5nHsiYBzR5oVxguglMoFyVwSmcubFUKiApBQCmFaU4F52dyrKqqXvKnVOExkhN0hOd6sd/k1DyDrN6AiTAZLNAvcXNN9grsoTZ6onB5s3rly9aGBKqcVNVOKkJ4OOY3YjWlLsGH5bNiPaUzTqovUXxALyqv4lhsB5EdkHqshjRDpGr60PKnZZieNOnO3qthjc22GddK7x7rHz99PV3QJN8PCOZbll/wCojhX2quYu1Edu/ovmPo8/mPO8Hz1TbFeVH8Wz0dXmLLVp9aK/rfyUvUBGfwSYMweWgUtHFWuhUvWdxpzKUgjQXi4mm0rC40Sb4jiRUkep6VXqUWFZckbsDZTy43VVYTtOeU083wOLt3RbHFiNkuGuzlZz6pBNSPwJl0PQTVvOzdajoLy1lReCCNyMr2fseiyjsziioRzRsKT4InBEhBw111HSE0gusGwq8XPRMAppL3JPAcm8ubFcKiAphVhTCtKcte7zQvstfS34t3QIbLTJhXGsnEH5/f3UcAmsO+ucdNdAQpj/ACIg/NXkFzFB4ME0INIjgaaDpC581xoSqXq0lURCszfYLPy27O6NL0vwWflt39SmMFlUsq0wx3UTBqhY8oPTh+ydNZYh48NTG9ZPGaDSFDNaj4gAO3fqWLmBU7+oXo2N8Mfw7Dp+KK+tMlx33XrzqP3J4eFaZepwZ14tJ89U3wJMUiQ3/wBLxXYTQ80tY3zYadwrZF9HFvl32VXw36KkYNg2clfGkmGlg3a1Ri9HD4EN3qxp4t/ZMi1OOUtOD23088CEmpP081J0RZxQ0VqY286xvwQDkxKZzHVOw2FZiNYzcTyC9ExtoIZGkkDnXsV51P2VH5QBvu7LPO9tuPwRgLCRhPLT9LrxyJGsHit9Cfmg1BBBIItBFLF5ZHfmhwvAqO/bmtHi9hgloYTZo1H02HrtTl0MsdttBem8nFsWYgx3C+1NpSZBFQVeOW2eWFh+0qYQMtHRzStYzTlRf5oCCqjZS4pZlph5oyOPhxATaSKWH+kJni6cw/q7BIYBDg4Vv/8AyE6xZJyXV/q7LDMQ+VEVENCojhZqUYMPy27x/cU9lWpBgv6GjW7k4rSSoU5eujjnS0od9/7d0W4JdORcmpRPV0qx8jtbAhMqMouJArWwA1P9w4rzWOag7Hc6gJtjZhMxJu02NZki+y23vwSUvsA1dfDwV3upx6hXCb9W0rkEfMs8tVkMUNdnE/dX4LhViHfxyad1V+ze34jTFZSFqFOBWld5xWVxJZkwiz+k2DUQPZasu9Esb05svVTj3VcUgAklXRjZVot1/ZJJ2RiRDnuzfQWcU7SkZ/CP/Ii0bXIbptofWnTisrhvBrnse9v4SDZ6XUG4BeizUq1jMhovssp19b0BOSIZBcDbQE7TTpqU6aTL8ePxo2bsJ9lGQmS036b+65hKHkucNFvuULANvBE8avYMHu+JCa/SWgnbpXWRMh2o3oDFKJWXbvHNHTTVEuqLNw4lYydy76hZSRjWBP5CLYuvFzZQ0lTmnaUqTKXOY7a7qUsVJjxfAs1lQmkm0tHHIbXnVarFN9Wu2josbBbRpA0Cn9oWmxHccl4/MOix5BGzhhVTIV8ALk0yxYmWYKubtf8A5n2WllVm8FDq7/7HLRypSvrpw8EvuSTDDs0+aU6iGxIMJ52aNJpxKFvJcLRSJipvyrfP/JUxYn+PcorGOWIik6anrW1Cw25TWkfsQa05clpPEq2DOPmn3qm+B5X/AJFPUDmfYFLoTKG3buF/vvW3ZINHwZhlLKB11tt+6p4KcqNt1giFkOqNIpqsFndaA+cEpkYYyG8tRpSiZMdYNgTjnyWA+eeWKLvRfA9OilpTSGdBBQ2E4OW0jUf24pgQoxGWVQbw/HDBHw2NdpJPCgQuA8V40Zjntb6AVs2kcF6phfFtkd9YloFzdGtNpeVbDZRooE9L+fTJYAkjChhjvqFh2oyZbYr3/wAx+1cjtsWV9bTwBJuo4jf5yTyTiUWfYaRAncsV0cd6Y5ztoYJzHbXdSlmUjoDvlE6igFqzeJwLj5oT7EqOBlg6S2nNJpeWcASRTeiMEsya7uVfdY5dlHp8pai40CrVmsBYVpRkQ7HHo73W1l4Yc1Y02RwaLT+p3+RWglklgMo94/O7/Ip5L3JOzCdJxzYlLRWK0fmB4W9kymDYgJMViDZ1s7pz0svGRx3wKfiFzRY8Bw1EX760O9Y0QjDJIFh+pvWnobrfZe9xpNsQZwBpdq2LLT+JTXOLgaA3i6mvir1+MpyTyvMywOtbfp+4Wjxfw18NphRRlMNlfTwU4I6LibFY66usaQjIWJryLbLK30PGim7V8oZYCw4wEQy8EfhdfX0Dhod1WulXVAuuHJZ/BGKbGDPAdZWjgDTeL9K0MrKNY3JaKAN7funJWWVn0ub7jzkugdK8PKL43nb7fdSyevW1Uh8W6fKedFWLPNKtF1FB4s8vCAp+H9kNMGwjwfZFuu8u08ELOMsTDPO/murpAPbseanGFiEiRfnEHQabqAjqUZEuWWXrqx8hJHAywNacSMJwpku4pHhAW71dJTcRn5hzWvH4y5PW4ZX4Tqilh2bkPXUOCHlcLMezJJLbNPdT+LrW7F5PSoK5JwjUr0SUxCyQPjRWM1XnsnchinKsuhxIh9XZjedO6w1T287kZR5uBK3mLkGYY05THFgBIrZSgut0dFpZaSDBmshQxqGU7iad0DjLGDJd5y3OcaNFtBaQDY2gNlUrh+iXd0xsmDpv07U5gmxJ5RNIblk7Y7MOsQuDW1i7jxJFO6tjusVOC3/NI1V5j3Tx9Tn40rbkRDhoaDaAi4fNauSvnQweK42GKGzVdu7q8XqFLvPL0yceb9nue6r9vdWP0+WXLmk+eqQVP7fspnziuUrTZTp7qQFyA5Tsvg2zapem3zsvni/kgKn3eXi/zahJkWbkdF9ihYw0b9x85INj8KwsmKHi5wodo/fki2uq1QxgbTJ9MrhYQq4D7FnlO3Tx3eJVhK9WywVWFFKVetOJHIeyIBsIqiv4Vn9IQeD3WppRdEYaP3zcGHcGjXZXebylU7jUxtywETCr3XlLJiaNVzXLIajZTmNrjWholb8Jui1BNbvOSzRi1THBbrCdY5Vr1CitMPWhlEwCAlEdWxJ1xTHcgpGNSO3XUcq9kRMOSaJMZMVh/MBxs7ox9Tn430s7zcjoTkhkZmzj29kzhR9OpbOOj69l0+iGbFVhfamlN3r6Ljr933t4qvLs80rgiW+bPZILAdPmj7rn7dPdVsdYd/QKQf55sQaR84L4u883qGXd5oUiaBIO19fNfFDxvsrK0B80oaZf06UKAS4wNqx2q3hSqTyzrEyw7GzXbDzp7JPKOsUZuji8V4RCokXWBEzgQMm6lRrVcfo5J0fyT7U1+IkUs9MPiLoYMJDeqYxtWfnMbGMJENhcfVxyW9yeSRTuMMxE/HkD0YMnnfzWMwtFum3jzTGfW4DabTsGlN8X47YjMpt2URaKXAfdeSS7s6ptJvJtJ2lepYmD/js1lx/vcOynPHTXj9bGURZKFlhYiHFZOmA5tyzGEYlXAa6rQTzrCsrONflE0OrilL2nPxsMHTNgKcS837LGYJn/AMLtleP2WggRBZQrpcuj5s3Z5b69VIzdyTscfPNqtFbEFozbNKTI6BYCrWXBBaFw49nm/ryCmIt+oVQjSrA7mkQn4lu49j2U/i1HHqhmut89AVW6LQeXWlBi4sSgGzuUHMRLNx6D3VD49TTaPOCGjzNGE66J6BBjHPfS2tp7U9yq5E2LKzOETEjOrocabK2dAn2DZoUWOd7dWE1DCaFiVwDnO3d0xjRKhK2n5h2dwnx+lyf8m8s9GfES2A5EZS6XM8HmfqVStmL1UnPE31ZCfQr1jFJw/h4Otlf/ACJPdeRr1fFj/wBNA/62f4hZ8s6a8N7bKWfYiCl8qUwaud1xQ+DVUPkwdCY0USp0CSPg4eioEKI36Xbin7wh3tTlsK4yg4GE3t+tu8W8kzgYRY40BvurZotsKXxGhDRGhVM6i8UacRrNnOmhTL7DTUeBt6LLtjOabCbaApjJzDjWpur1otMctsssNG7IpsrsK4IpHmm37IaG49eVKK0H/Gu8Jo0vfHs227gLAhYkxYdg5BS0DZ2ComBmnZ2KY0HfPgAE6croUpn510T5bLbXAnQDX3AQs485g1numcnDAFgU5ZaXhhtTgnBMKECS0FzrXEipNdtw1KmLJsDs3N5BPIDVCfYCBYsW8I40Nzb7R6oBrs8bCj5g0s1HolsH69xV4exPJ5TSEVdlqiGprpcr/9k=',
                  }}
                  style={styles.profileAvatar} />

                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>Yua Mikami</Text>

                  <Text style={styles.profileHandle}>
                    yua.mikami@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tài khoản</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <FontAwesome6 
                        color='#006C5E'
                        name='user-large'
                        size={19}
                        marginRight={10}/>      

                    <Text style={styles.rowLabel}>Hồ sơ</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                        color="#bcbcbc"
                        name="chevron-right"
                        size={19} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <FontAwesome6
                        color='#006C5E'
                        name='map-location'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Địa chỉ</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>

                    <Ionicons 
                        color='#006C5E'
                        name='settings'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Cài đặt</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tương tác</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <Fontisto 
                        color='#006C5E'
                        name='history'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Lịch sử đơn hàng</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trung tâm trợ giúp</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <MaterialCommunityIcons 
                        color='#006C5E'
                        name='frequently-asked-questions'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Câu hỏi thường gặp</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>

                    <FontAwesome6 
                        color='#006C5E'
                        name='headset'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Phản hồi và hỗ trợ</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chung</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <MaterialCommunityIcons 
                        color='#006C5E'
                        name='shield-check'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Chính sách</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <MaterialCommunityIcons 
                        color='#006C5E'
                        name='file-document'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>CT Thành viên</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>

                    <Ionicons 
                        color='#006C5E'
                        name='layers'
                        size={19}
                        marginRight={10}/>
                  <Text style={styles.rowLabel}>Giới thiệu về phiên bản ứng dụng</Text>

                  <View style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionBody}>
              <View
                style={[styles.button, { alignItems: 'center' }]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.buttonText}>
                    Đăng xuất
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.contentFooter}>App Version 1.0.0</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    marginBottom: 30,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 15,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 16,
    letterSpacing: 0.33,
    fontWeight: '600',
    color: '#3A3A3A',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
    fontFamily: 'Lato',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
    fontFamily: 'Lato',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
    fontFamily: 'Lato',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
    fontFamily: 'Lato',
  },
  /** button */
  button: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#006C5E',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontStyle: 'normal'
  },
});